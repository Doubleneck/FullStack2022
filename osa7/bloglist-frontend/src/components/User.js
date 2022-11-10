/* import { useState } from 'react' */
/* import blogService from '../services/blogs'
import store from '../store'
import { setNotification } from '../reducers/notificationReducer'
import { setLikes, removeBlog } from '../reducers/blogsReducer' */

/* const User = ({ user }) => {
  const [showAll, setShowAll] = useState(false)
  const user =
    JSON.parse(window.localStorage.getItem('loggedBlogappUser')) || null

  const showAllDetails = () => setShowAll(true)
  const hideSomeDetails = () => setShowAll(false)

  return (
    <div>
      <span onClick={showAllDetails} id="showAll">
        <mark>{user.username}</mark>
      </span>{' '}
      {showAll ? (
        <div>
          <div>{user.username}</div>
          <button onClick={hideSomeDetails}> hide </button>)
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
} */

/* export default User */

import {
  // ...
  useParams,
} from 'react-router-dom'

const User = ({ users }) => {
  const id = useParams().id
  console.log(id)
  const user = users.find((user) => user.id === id)
  if (!user) {
    return null
  }

  return (
    <div>
      <div>
        <h1>{user.username}</h1>
        <div>
          <strong>Added Blogs</strong>
        </div>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>
              <p>{blog.title}</p>
            </li>
          ))}
        </ul>
      </div>
      <div></div>
    </div>
  )
}

export default User
