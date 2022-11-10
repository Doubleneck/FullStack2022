import { useSelector } from 'react-redux'
import Blog from '../components/Blog'

const Blogs = () => {
  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  return (
    <ul>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </ul>
  )
}

export default Blogs
