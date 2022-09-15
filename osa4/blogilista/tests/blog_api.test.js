const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)


/*   
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
}) */

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})
describe('blog api tests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  afterAll(() => {
    mongoose.connection.close()
  })

  test('All blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(titles).toContain(
      'testiblogi2'
    )
  })
  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'testiblogi lisätty',
      author: 'Mr Tester',
      url: 'www.google.com',
      likes:5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(
      'testiblogi lisätty'
    )
  })

  test('a blog without likes returns blog with 0 likes ', async () => {
    const newBlog = {
      title: 'liket puuttuu tästä',
      author: 'Mr Tester',
      url: 'www.google.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    const likes = blogsAtEnd.map(b => b.likes) 
    expect(likes).toContain(0)
  })

  test('deleting a blog removes blog', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(r => r.id)
    const firstBlogInDbId = ids[0]
    await api
      .delete('/api/blogs/'+`${firstBlogInDbId}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()  
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length-1)
  
  })

  test('there is the field  id blog', async() => {
    const blogsAtEnd = await helper.blogsInDb()
    const firstblock = blogsAtEnd[0]
    expect(firstblock.id).toBeDefined()
  })
})