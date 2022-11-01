import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filter',
    initialState :{},
    reducers: {
      newFilter(state, action) {
       state.filter = action.payload
        console.log(action.payload) 
       return state
      }
    },
  })
  
  export const setFilter= filterText => {
    return async dispatch => {
      console.log(filterText)
      dispatch(newFilter(filterText))
    }
  }

export const { newFilter } = filterSlice.actions
export default filterSlice.reducer