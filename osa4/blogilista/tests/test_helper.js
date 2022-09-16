const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'testiblogi1',
    author: 'Mr Tester',
    url: 'www.google.com',
    likes:10
  },
  {
    title: 'testiblogi2',
    author: 'MrPanhead Tester',
    url: 'no url',
    likes:10
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ 
    title: 'testiblogi_add',
    author: 'MrPanhead Tester',
    url: 'no url',
    likes:5
  }) 
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b=> b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, 
  nonExistingId, 
  blogsInDb,
  usersInDb
}