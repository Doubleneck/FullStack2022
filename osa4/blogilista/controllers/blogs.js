const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})  
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  let body = request.body
//  logger.info(body.title !== undefined && body.url !== undefined)
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

module.exports = blogsRouter