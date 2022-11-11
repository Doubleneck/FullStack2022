import blogService from '../services/blogs'
import store from '../store'
import { setNotification } from '../reducers/notificationReducer'
import { setLikes } from '../reducers/blogsReducer'

const updateBlog = async (blog) => {
  const blogObject = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    user: blog.user,
    likes: blog.likes + 1,
    id: blog.id,
  }
  try {
    await blogService.update(blog.id, blogObject)
    store.dispatch(setLikes(blog.id))
    store.dispatch(
      setNotification(
        `You liked ${blogObject.title} by ${blogObject.author}`,
        3,
        'update'
      )
    )
  } catch (expection) {
    store.dispatch(
      setNotification('something went wrong when trying to like', 3, 'error')
    )
  }
}

import { useParams } from 'react-router-dom'

const Blog = ({ blogs }) => {
  const handleAddLike = () => {
    updateBlog(blog)
  }

  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)
  if (!blog) {
    return null
  }
  const blogUrl = 'https://' + blog.url
  return (
    <div>
      <div>
        <h1>
          {blog.title} written by {blog.author}
        </h1>
        <div>
          <a href={blogUrl}>{blog.url}</a>
        </div>
        <div>
          likes {blog.likes}{' '}
          <button onClick={handleAddLike} id="like">
            like
          </button>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default Blog
