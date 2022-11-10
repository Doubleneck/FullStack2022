import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import './index.css'
import store from './store'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import { setNotification } from './reducers/notificationReducer'
import { setBlogs } from './reducers/blogsReducer'
import { setUsers } from './reducers/usersReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import {
  setPasswordInStore,
  setUsernameInStore,
  resetCredentials,
  setUser,
} from './reducers/loginFormReducer'

const App = () => {
  const padding = {
    padding: 5,
  }
  const username = useSelector((state) => state.loginForm.username)
  const password = useSelector((state) => state.loginForm.password)
  const user = useSelector((state) => state.loginForm.user)
  const users = useSelector((state) => state.users)
  /*  console.log(users) */
  const [loginVisible, setLoginVisible] = useState(false)
  const blogFormRef = useRef()
  const Home = () => (
    <div>
      {' '}
      <h2>TKTL Andy`s Blog app</h2>{' '}
    </div>
  )

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
    store.dispatch(setUser(null))
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
      store.dispatch(resetCredentials())
      store.dispatch(setUser(user))
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
    userService
      .getAll()
      .then((users) =>
        store.dispatch(setUsers(users.sort((a, b) => b.username - a.username)))
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
      <Router>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/blogs">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>

        <Notification />
        {user === null ? (
          <div>{loginForm()}</div>
        ) : (
          <div>
            {user.name} logged in{' '}
            <button onClick={handleLogout} id="logout">
              {' '}
              logout{' '}
            </button>
            {blogForm()}
          </div>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/users" element={<Users users={users} Link={Link} />} />
          <Route path="/users/:id" element={<User users={users} />} />
        </Routes>

        <div>
          <i>Note app, Department of Computer Science 2022</i>
        </div>
      </Router>

      {/* <h2>Blogs</h2> */}

      {/*  <Blogs /> */}
    </div>
  )
}

export default App
