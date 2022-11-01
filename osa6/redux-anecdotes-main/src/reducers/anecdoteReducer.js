import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState :[],
  reducers: {
    newAnecdote(state, action) {
      state.push(action.payload)
    },
    toggleVoteOf(state, action) {
      
      console.log(action.payload)
      const id = action.payload.id
      const anecdoteToVote = state.find(a => a.id === id)
      const votedAnecdote= { 
        ...anecdoteToVote, 
        votes: action.payload.votes
      }
      return state.map(anecdote=>
        anecdote.id !== id ? anecdote : votedAnecdote
      ).sort((a, b) => b.votes - a.votes) 
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const initializeAnecdotes= () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes.sort((a, b) => b.votes - a.votes)))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote= await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addLikeToAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote= await anecdoteService.upDate(anecdote)
    dispatch(toggleVoteOf(newAnecdote))
  }
}

export const { newAnecdote, toggleVoteOf ,appendAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer