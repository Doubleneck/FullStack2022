import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer, { appendAnecdote, setAnecdotes} from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdoteService from './services/anecdotes'

const store = configureStore({
    reducer  :{
        anecdotes : anecdoteReducer,
        notification: notificationReducer
    }
  })

anecdoteService.getAll().then(anecdotes =>
  store.dispatch(setAnecdotes(anecdotes))
  )  

console.log('in store',store.getState())
export default store