const mongoose = require('mongoose')
require('dotenv').config()
// ÄLÄ KOSKAAN TALLETA SALASANOJA GitHubiin!
const url = process.env.MONGODB_URI
  

mongoose.connect(url)

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
    title: 'testiblogi',
    author: 'Mr Tester',
    url: 'www.google.com',
    likes: 10
  })

  blog.save().then(result => {
    console.log('blog saved!')
    mongoose.connection.close()
  })  