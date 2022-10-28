import { useSelector, useDispatch } from 'react-redux'
import  { toggleVoteOf } from '../reducers/anecdoteReducer'
import  { voteNotification, clearNotification } from '../reducers/notificationReducer'

const Anecdotes = () =>{

    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(toggleVoteOf(anecdote.id))  
        dispatch(voteNotification(anecdote)) 
        setTimeout(() => {
            dispatch(clearNotification(anecdote)) 
        }, 5000)
    }

  return (
    <div>
    
    <h2>Anecdotes</h2>
    {anecdotes.map(anecdote =>
    <div key={anecdote.id}>
      <div>
      {anecdote.content}
      </div>
      <div>
      has {anecdote.votes}
      <button onClick={() => vote(anecdote)}>vote</button>
       </div>
    </div>
    )}
    </div>
  )
}

export default Anecdotes