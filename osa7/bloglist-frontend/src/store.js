import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogFormReducer from './reducers/blogFormReducer'
import loginFormReducer from './reducers/loginFormReducer'
import blogsReducer from './reducers/blogsReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogForm: blogFormReducer,
    blogs: blogsReducer,
    users: usersReducer,
    loginForm: loginFormReducer,
  },
})

export default store
