import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'
import store from '../store'
import { setUser } from '../reducers/loginFormReducer'
import blogService from '../services/blogs'
import Button from 'react-bootstrap/Button'
const LoginForm = ({
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  const navigate = useNavigate()
  console.log(navigate)

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      store.dispatch(setUser(user))
      navigate('/')
    } catch (exception) {
      store.dispatch(setNotification('Wrong credentials', 3, 'error'))
    }
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <Button id="login-button" type="submit">
          login
        </Button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}
export default LoginForm
