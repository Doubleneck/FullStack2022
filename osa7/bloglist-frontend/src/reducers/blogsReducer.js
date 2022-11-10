import { createSlice } from '@reduxjs/toolkit'
const initialState = []

const blogSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setLikes(state, action) {
      const id = action.payload
      const blogToChange = state.find((b) => b.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      }
      return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { appendBlog, setBlogs, createBlog, setLikes, removeBlog } =
  blogSlice.actions

export default blogSlice.reducer
