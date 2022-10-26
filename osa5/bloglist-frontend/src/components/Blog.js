import { useState } from 'react'

const Blog = ({ blog, handleUpdateBlog, handleDeleteBlog,  }) => {
  const [showAll, setShowAll] = useState(false)
  const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser')) || null

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showAllDetails = () => setShowAll(true)
  const hideSomeDetails = () => setShowAll(false)
  const handleAddLike = () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user,
      likes: blog.likes + 1,
    }
    handleUpdateBlog(blog.id,blogObject)
  }
  const handleDelete = () => {
    handleDeleteBlog(blog)
  }


  return (
    <div style={blogStyle}>
      <span onClick={showAllDetails} id='showAll'><mark>{blog.title}</mark></span> {blog.author}
      {showAll? (
        <div>
          <div>likes {blog.likes} <button onClick={handleAddLike} id='like'>like</button></div>
          <div>{blog.url}</div>
          <div>{blog.user.name}</div>
          <button onClick={hideSomeDetails} > hide </button>
          {user  && blog.user.username === user.username ?
            <div>< button style = {{ color:'red' }} onClick={handleDelete} id='delete'> delete </button></div>
            :
            <div></div>
          }
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )}

export default Blog