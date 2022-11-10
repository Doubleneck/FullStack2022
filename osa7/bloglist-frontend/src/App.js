import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import store from './store'
import Blogs from './components/Blogs'
import { setNotification } from './reducers/notificationReducer'
import { setBlogs } from './reducers/blogsReducer'
import {
  setPasswordInStore,
  setUsernameInStore,
  resetCredentials,
} from './reducers/loginFormReducer'

const App = () => {
  const username = useSelector((state) => state.loginForm.username)
  const password = useSelector((state) => state.loginForm.password)
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm />
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
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const handlePasswordChange = (event) => {
    store.dispatch(setPasswordInStore(event.target.value))
  }
  const handleUsernameChange = (event) => {
    store.dispatch(setUsernameInStore(event.target.value))
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
      store.dispatch(resetCredentials())
    } catch (exception) {
      store.dispatch(setNotification('Wrong credentials', 3, 'error'))
    }
  }
  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) =>
        store.dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
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
      <Notification />
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

      <Blogs />
    </div>
  )
}

export default App
