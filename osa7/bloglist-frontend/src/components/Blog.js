import { useState } from 'react'
import blogService from '../services/blogs'
import store from '../store'
import { setNotification } from '../reducers/notificationReducer'
import { setLikes, removeBlog } from '../reducers/blogsReducer'

const deleteBlog = async (blog) => {
  if (window.confirm(` Remove blog ${blog.title}  by ${blog.author} ?`)) {
    try {
      await blogService.remove(blog.id)
      store.dispatch(removeBlog(blog.id))
      store.dispatch(
        setNotification(
          `Removing ${blog.title} by ${blog.author} succeed!`,
          3,
          'update'
        )
      )
    } catch (exception) {
      store.dispatch(
        setNotification(
          `Removing ${blog.title} by ${blog.author} failed!`,
          3,
          'error'
        )
      )
    }
  }
}

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

const Blog = ({ blog }) => {
  const [showAll, setShowAll] = useState(false)
  const user =
    JSON.parse(window.localStorage.getItem('loggedBlogappUser')) || null

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const showAllDetails = () => setShowAll(true)
  const hideSomeDetails = () => setShowAll(false)
  const handleAddLike = () => {
    updateBlog(blog)
  }
  const handleDelete = () => {
    deleteBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <span onClick={showAllDetails} id="showAll">
        <mark>{blog.title}</mark>
      </span>{' '}
      {blog.author}
      {showAll ? (
        <div>
          <div>
            likes {blog.likes}{' '}
            <button onClick={handleAddLike} id="like">
              like
            </button>
          </div>
          <div>{blog.url}</div>
          <div>{blog.user.name}</div>
          <button onClick={hideSomeDetails}> hide </button>
          {user && blog.user.username === user.username ? (
            <div>
              <button
                style={{ color: 'red' }}
                onClick={handleDelete}
                id="delete"
              >
                {' '}
                delete{' '}
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default Blog
