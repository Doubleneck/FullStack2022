import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const handleBlogTitleChange= (event ) => { setNewBlogTitle(event.target.value)}
  const handleBlogAuthorChange= (event ) => { setNewBlogAuthor(event.target.value)}
  const handleBlogUrlChange= (event ) => { setNewBlogUrl(event.target.value)}

  const addBlog =  (event) => {
    console.log('blogformissa:' , newBlogTitle,newBlogAuthor ,newBlogUrl)
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    })
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type="text"
            value={newBlogTitle}
            name="title"
            placeholder='write here blog title'
            onChange={handleBlogTitleChange}
          />
        </div>
        <div>
         author
          <input
            type="text"
            value={newBlogAuthor}
            name="author"
            placeholder='write here blog author'
            onChange={handleBlogAuthorChange}
          /> 
        </div>
        <div>
         url
          <input
            type="text"
            value={newBlogUrl}
            name="url"
            placeholder='write here blog url'
            onChange={handleBlogUrlChange}
          /> 
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm
