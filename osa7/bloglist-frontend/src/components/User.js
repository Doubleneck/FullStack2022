import { useState } from 'react'
/* import blogService from '../services/blogs'
import store from '../store'
import { setNotification } from '../reducers/notificationReducer'
import { setLikes, removeBlog } from '../reducers/blogsReducer' */

const User = ({ user }) => {
  const [showAll, setShowAll] = useState(false)
  /* const user =
    JSON.parse(window.localStorage.getItem('loggedBlogappUser')) || null */

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const showAllDetails = () => setShowAll(true)
  const hideSomeDetails = () => setShowAll(false)

  return (
    <div style={blogStyle}>
      <span onClick={showAllDetails} id="showAll">
        <mark>{user.username}</mark>
      </span>{' '}
      <div>{user.blogs.length}</div>
      {showAll ? (
        <div>
          <div>{user.blogs.length}</div>
          <div>{user.username}</div>
          <button onClick={hideSomeDetails}> hide </button>)
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default User
