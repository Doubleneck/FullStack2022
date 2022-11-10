import { createSlice } from '@reduxjs/toolkit'
const initialState = { newBlogTitle: '', newBlogAuthor: '', newBlogUrl: '' }

const blogFormSlice = createSlice({
  name: 'blogForm',
  initialState,
  reducers: {
    setNewBlogTitle(state, action) {
      state.newBlogTitle = action.payload
      return state
    },
    setNewBlogAuthor(state, action) {
      state.newBlogAuthor = action.payload
      return state
    },
    setNewBlogUrl(state, action) {
      state.newBlogUrl = action.payload
      return state
    },
    clearBlogForm() {
      console.log('clearBlogFormState')
      return initialState
    },
  },
})

export const setBlogForm = (content, type) => {
  if (type === 'title') {
    return (dispatch) => {
      dispatch(setNewBlogTitle(content))
    }
  }
  if (type === 'author') {
    return (dispatch) => {
      dispatch(setNewBlogAuthor(content))
    }
  }
  if (type === 'url') {
    return (dispatch) => {
      dispatch(setNewBlogUrl(content))
    }
  }
  if (type === 'clear') {
    return (dispatch) => {
      dispatch(clearBlogForm())
    }
  }
}

export const {
  setNewBlogTitle,
  setNewBlogAuthor,
  setNewBlogUrl,
  clearBlogForm,
} = blogFormSlice.actions
export default blogFormSlice.reducer
