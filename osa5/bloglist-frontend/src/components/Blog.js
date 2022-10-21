import Togglable from './Togglable'
import { useState } from 'react' 


const handleAddLikes = async (event) =>{
  event.preventDefault()
 
}




const Blog = ({blog}) => {
  const [showAll, setShowAll] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const showAllDetails = () => setShowAll(true)
  const hideSomeDetails = () => setShowAll(false)
  return (

  <div style={blogStyle}>
        {blog.title} {blog.author} 
        
         {showAll? (
        <div>
          <div>likes {blog.likes}</div>
          <div>{blog.url}</div>
          <div>{blog.user.name}</div>
         
        <button onClick={hideSomeDetails} > hide </button>
        </div>  
          ) : (
        <button onClick={showAllDetails} > view </button>
        )}    
  </div>  
)}

export default Blog