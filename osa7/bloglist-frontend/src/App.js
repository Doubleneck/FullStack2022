import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import userService from './services/users'
import './index.css'
import store from './store'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import { setBlogs } from './reducers/blogsReducer'
import { setUsers } from './reducers/usersReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import {
  setPasswordInStore,
  setUsernameInStore,
  setUser,
} from './reducers/loginFormReducer'

const App = () => {
  const username = useSelector((state) => state.loginForm.username)
  const password = useSelector((state) => state.loginForm.password)
  const user = useSelector((state) => state.loginForm.user)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)
  const blogFormRef = useRef()
  const Home = () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      {' '}
      <h1>Welcome to TKTL Andy`s Blog app</h1>{' '}
    </div>
  )

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
    console.log('logout', user)
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
      store.dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div style={{ backgroundColor: '#EBF5FB' }}>
      <Router>
        <Navbar bg="primary" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Navbar.Brand href="/blogs">Blogs</Navbar.Brand>
            <Navbar.Brand href="/users">Users</Navbar.Brand>
            {user ? (
              <Navbar.Brand href="/">{user.username} logged in</Navbar.Brand>
            ) : (
              <Navbar.Brand href="/login">Login</Navbar.Brand>
            )}
          </Container>
        </Navbar>
        <Notification />
        {user ? (
          <div>
            {' '}
            <div
              style={{
                display: 'flex',
                justifyContent: 'right',
              }}
            >
              <Button onClick={handleLogout} id="logout">
                Logout
              </Button>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm />
              </Togglable>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs blogs={blogs} Link={Link} />} />
          <Route path="/blogs/:id" element={<Blog blogs={blogs} />} />
          <Route path="/users" element={<Users users={users} Link={Link} />} />
          <Route path="/users/:id" element={<User users={users} />} />
          <Route
            path="/login"
            element={
              <LoginForm
                username={username}
                password={password}
                handleUsernameChange={handleUsernameChange}
                handlePasswordChange={handlePasswordChange}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
