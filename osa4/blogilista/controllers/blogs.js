const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 }) 
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  let body = request.body
  
  const token = request.token 
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  if (body.likes === undefined){
    body.likes = 0
  }
  if (body.title !== undefined && body.url !== undefined){
    
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
    response.status(201).json(savedBlog)
   
  } else {
    response.status(400).json(body)
  }
})

blogsRouter.get('/:id', async (request, response,) => {
  
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).json({error: `Blog not found with id ${request.params.id}`})
  }  
})  


blogsRouter.delete('/:id', async (request, response) => {
  
  const blog = await Blog.findById(request.params.id)
  if (!blog) {return response.status(404).json({error: `Blog not found with id ${request.params.id}`})}
  const tokenDecoded = jwt.verify(request.token, process.env.SECRET)
  if (blog.user.toString() === tokenDecoded.id){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(400).json({error: `Not allowed to delete , not created by user with id : ${tokenDecoded.id}`}) 
  }
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