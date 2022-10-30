import { useDispatch } from 'react-redux'
import  { createAnecdote } from '../reducers/anecdoteReducer'
import  { createNotification, clearNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const NewAnecdote= (props) => {
    
    const dispatch = useDispatch()
    const addAnecdote = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      console.log('content',content)
      const newAnecdote = await anecdoteService.createNew(content)
      
      dispatch(createAnecdote(newAnecdote))
      dispatch(createNotification(content))
      setTimeout(() => {
        dispatch(clearNotification(content)) 
    }, 5000)

    } 
    return (
      <div>
      <h2>create new</h2>
        <form onSubmit={addAnecdote}>
          <div><input name="anecdote"/></div>
          <button type="submit">create</button>
        </form>  
      </div>
  )}
  
  export default NewAnecdote