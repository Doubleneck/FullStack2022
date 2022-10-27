import { useSelector, useDispatch } from 'react-redux'
import { toggleVoteOf }from '../reducers/anecdoteReducer'

const AnecdoteList = () =>{

    const anecdotesFromSelector = useSelector(state => state)
    const anecdotes = anecdotesFromSelector.sort((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()
    const vote = (id) => {
      dispatch(toggleVoteOf(id))
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
      <button onClick={() => vote(anecdote.id)}>vote</button>
       </div>
    </div>
    )}
    </div>
  )
}

export default AnecdoteList