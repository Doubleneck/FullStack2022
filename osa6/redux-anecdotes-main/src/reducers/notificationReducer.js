import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {

      createNotification (state, action) {
        return action.payload
      },
      clearNotification (state, action) {
        
        console.log('clear')
        return initialState
      }
    },
  })

  export const setNotification = (content,time) => {  
        const ms = time * 1000
        return async dispatch => {
          dispatch(createNotification(content)) 
          const timeoutID = setTimeout(() => {
            dispatch(clearNotification())
          }, ms)
        
    }
  } 
 
  export const { createNotification, voteNotification, clearNotification } = notificationSlice.actions
  export default notificationSlice.reducer
