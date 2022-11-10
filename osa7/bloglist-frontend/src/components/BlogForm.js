import store from '../store'

import { setBlogForm } from '../reducers/blogFormReducer'
import { useSelector } from 'react-redux'
import { appendBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const createBlog = (blogObject) => {
  blogService
    .create(blogObject)
    .then((returnedBlog) => {
      store.dispatch(
        setNotification(
          `A new blog ${returnedBlog.title} by ${returnedBlog.author} added `,
          3,
          'update'
        )
      )
      store.dispatch(appendBlog(returnedBlog))
    })
    .catch((error) => {
      store.dispatch(setNotification(error.message, 3, 'error'))
    })
}
const BlogForm = () => {
  const newBlogTitle = useSelector((state) => state.blogForm.newBlogTitle)
  const newBlogAuthor = useSelector((state) => state.blogForm.newBlogAuthor)
  const newBlogUrl = useSelector((state) => state.blogForm.newBlogUrl)
  const handleBlogTitleChange = (event) => {
    store.dispatch(setBlogForm(event.target.value, 'title'))
    console.log('store blogform ', store.getState())
  }
  const handleBlogAuthorChange = (event) => {
    store.dispatch(setBlogForm(event.target.value, 'author'))
  }
  const handleBlogUrlChange = (event) => {
    store.dispatch(setBlogForm(event.target.value, 'url'))
  }

  const onSubmit = (event) => {
    console.log('blogformissa:', newBlogTitle, newBlogAuthor, newBlogUrl)
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    })
    store.dispatch(setBlogForm('', 'clear'))
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={onSubmit}>
        <div>
          title
          <input
            id="title"
            type="text"
            value={newBlogTitle}
            name="title"
            placeholder="write here blog title"
            onChange={handleBlogTitleChange}
          />
        </div>
        <div>
          author
          <input
            id="author"
            type="text"
            value={newBlogAuthor}
            name="author"
            placeholder="write here blog author"
            onChange={handleBlogAuthorChange}
          />
        </div>
        <div>
          url
          <input
            id="url"
            type="text"
            value={newBlogUrl}
            name="url"
            placeholder="write here blog url"
            onChange={handleBlogUrlChange}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm
