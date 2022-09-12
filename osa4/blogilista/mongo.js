const mongoose = require('mongoose')

// ÄLÄ KOSKAAN TALLETA SALASANOJA GitHubiin!
const url =
  `mongodb+srv://fullstack:<password>@cluster0.o1opl.mongodb.net/noteApp?retryWrites=true&w=majority`

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

  note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })  