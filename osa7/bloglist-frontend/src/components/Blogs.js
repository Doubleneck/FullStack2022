const Blogs = ({ blogs, Link }) => (
  <div>
    <h2>Blogs</h2>
    <ul>
      {blogs.map((blog) => (
        <li key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export default Blogs
