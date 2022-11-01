import { useSelector, useDispatch } from 'react-redux'
import  { addLikeToAnecdote } from '../reducers/anecdoteReducer'
import  { setNotification } from '../reducers/notificationReducer'

const Anecdotes = () =>{
    
    let filterText = useSelector(state => state.filter).filter
    console.log('anecdotes',filterText)
    if (!filterText){
      filterText = ''
    }
    const anecdotes =  useSelector(state => state.anecdotes.filter(anecdote => anecdote.content.includes(filterText))) 
   
   
    const dispatch = useDispatch()
    const vote = (anecdote) => {
        dispatch(addLikeToAnecdote(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
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