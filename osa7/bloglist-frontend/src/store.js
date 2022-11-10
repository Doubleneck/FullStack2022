import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogFormReducer from './reducers/blogFormReducer'
import loginFormReducer from './reducers/loginFormReducer'
import blogsReducer from './reducers/blogsReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogForm: blogFormReducer,
    blogs: blogsReducer,
    loginForm: loginFormReducer,
  },
})

export default store
