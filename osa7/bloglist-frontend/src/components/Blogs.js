import { useSelector } from 'react-redux'
import Blog from '../components/Blog'

const Blogs = () => {
  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
    </div>
  )
}

export default Blogs
