import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Notification from './components/Notification'
import { Provider } from 'react-redux'
import store from './store'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        store.dispatch(
          setNotification(
            `A new blog ${blogObject.title} by ${blogObject.author} added `,
            3,
            'update'
          )
        )
        setBlogs(blogs.concat(returnedBlog))
      })
      .catch((error) => {
        store.dispatch(setNotification(error.message, 3, 'error'))
      })
  }

  const handleDeleteBlog = async (blog) => {
    if (window.confirm(` Remove blog ${blog.title}  by ${blog.author} ?`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
        store.dispatch(
          setNotification(
            `Removing ${blog.title} by ${blog.author} succeed!`,
            3,
            'update'
          )
        )
      } catch (exception) {
        store.dispatch(
          setNotification(
            `Removing ${blog.title} by ${blog.author} failed!`,
            3,
            'error'
          )
        )
      }
    }
  }

  const handleUpdateBlog = async (id, blog) => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user,
      likes: blog.likes,
      id: id,
    }
    try {
      await blogService.update(id, blog)
      setBlogs(blogs.map((b) => (b.id !== id ? b : blogObject)))
      store.dispatch(
        setNotification(
          `You liked ${blogObject.title} by ${blogObject.author}`,
          3,
          'update'
        )
      )
    } catch (expection) {
      store.dispatch(
        setNotification('something went wrong when trying to like', 3, 'error')
      )
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      store.dispatch(setNotification('Wrong credentials', 3, 'error'))
    }
  }
  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Provider store={store}>
        <Notification />
      </Provider>

      {/*  <SuccessNotification message={updateMessage} /> */}
      {/* <ErrorNotification message={errorMessage} /> */}
      {user === null ? (
        <div>{loginForm()}</div>
      ) : (
        <div>
          <p>
            {user.name} logged in{' '}
            <button onClick={handleLogout} id="logout">
              {' '}
              logout{' '}
            </button>
          </p>
          {blogForm()}
        </div>
      )}
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleUpdateBlog={handleUpdateBlog}
          handleDeleteBlog={handleDeleteBlog}
        />
      ))}
    </div>
  )
}

export default App
