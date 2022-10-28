import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import  { createNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    
    const dispatch = useDispatch()
    const create = (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      dispatch(createAnecdote(content))
      dispatch(createNotification(content)) 
        /* console.log(content) */
    } 
    return (
      <div>
      <h2>create new</h2>
        <form onSubmit={create}>
          <div><input name="anecdote"/></div>
          <button type="submit">create</button>
        </form>  
      </div>
  )}
  
  export default AnecdoteForm