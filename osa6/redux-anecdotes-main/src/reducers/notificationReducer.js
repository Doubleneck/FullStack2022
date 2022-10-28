import { createSlice } from '@reduxjs/toolkit'
const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      createNotification (state, action) {
        return 'You created:' + action.payload
      },
      voteNotification (state, action) {
        console.log('toggleVote', action)
        return 'You voted :' + action.payload.content
      },
      clearNotification (state, action) {
        console.log('clear')
        return initialState
      }
    },
  })
 
  
  export const { createNotification, voteNotification, clearNotification } = notificationSlice.actions
  export default notificationSlice.reducer
