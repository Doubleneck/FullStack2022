const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})  
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  let body = request.body

  if (body.likes === undefined){
    body.likes = 0
  }
  if (body.title !== undefined && body.url !== undefined){
    
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    })
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
   
  } else {
    response.status(400).json(body)
  }
})

blogsRouter.get('/:id', async (request, response,) => {

  const note = await Blog.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }  
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
} 
)

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = ({
    title: body.title, 
    author:body.author,
    url:body.url,
    likes:body.likes
  })
  await Blog.findByIdAndUpdate(request.params.id, blog, {new:true})
  response.status(204).end()
} 
)
module.exports = blogsRouter