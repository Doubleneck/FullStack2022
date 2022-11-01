import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import  { addLikeToAnecdote } from '../reducers/anecdoteReducer'
import  { setNotification } from '../reducers/notificationReducer'

const Anecdotes = (props) =>{

   let filterText = props.filter.filter
   console.log('filsu', filterText)
   if (!filterText){
    filterText = ''
  } 
   const anecdotes = props.anecdotes.filter(anecdote => anecdote.content.includes(filterText))
   
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
const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const ConnectedAnecdotes = connect(mapStateToProps)(Anecdotes)
export default ConnectedAnecdotes