import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [updateMessage, setUpdateMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
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
      .then(returnedBlog => {
        setUpdateMessage(`A new blog ${blogObject.title} by ${blogObject.author} added `)
        setTimeout(() => {
          setUpdateMessage(null)
        }, 5000)
        setBlogs(blogs.concat(returnedBlog))
      })
      .catch((error) => {
        error('something went wrong while trying to add a new blog', error.message)
      })
  }

  const handleDeleteBlog = async (blog) => {
    if (window.confirm(` Remove blog ${blog.title}  by ${blog.author} ?`)){
      try {
        await blogService.remove(blog.id)
        setUpdateMessage(`Removing ${blog.title} by ${blog.author} succeed!`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setBlogs(blogs.filter(b => b.id !== blog.id))
      } catch {
        setErrorMessage(`Error while trying to remove ${blog.title} by ${blog.author}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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
      id: id
    }
    try {
      await blogService.update(id, blog)
      setBlogs(blogs.map(b => b.id !== id ? b: blogObject))

    } catch (expection) {
      setErrorMessage('Error while trying to like')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  useEffect(() => {
    blogService.getAll()
      .then(blogs => setBlogs( blogs.sort((a, b) => a.likes - b.likes) )
      )
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
      < SuccessNotification message = {updateMessage} />
      < ErrorNotification message = {errorMessage} />
      {user === null ?
        <div>
          {loginForm()}
        </div>  :
        <div>
          <p>{user.name} logged in <button onClick={handleLogout} > logout </button></p>
          {blogForm()}
        </div>
      }
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleUpdateBlog={handleUpdateBlog} handleDeleteBlog={handleDeleteBlog}/>
      )}
    </div>
  )
}

const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="update">
      {message}
    </div>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

export default App
