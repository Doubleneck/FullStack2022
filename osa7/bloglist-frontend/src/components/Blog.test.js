import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const user = userEvent.setup()
const blog = {
  title: 'Testiotsikko',
  author: 'Testikirjailija',
  url: 'Testiurl',
  likes: 100,
  user: user,
}
test('renders content', () => {
  const blog = {
    title: 'Testiotsikko',
    author: 'Testikirjailija',
    url: 'Testiurl',
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Testiotsikko')

  expect(element).toBeDefined()
})

test('after clicking the button title,author,url and likes viewed', async () => {
  const user = userEvent.setup()
  const blog = {
    title: 'Testiotsikko',
    author: 'Testikirjailija',
    url: 'Testiurl',
    likes: 100,
    user: user,
  }
  const mockHandler = jest.fn()

  render(<Blog blog={blog} showAllDetails={mockHandler} />)

  const button = screen.getByText('Testiotsikko')
  await user.click(button)
  const element1 = screen.getByText('Testiotsikko')
  expect(element1).toBeDefined()
  const element2 = screen.getByText('Testikirjailija')
  expect(element2).toBeDefined()
  const element3 = screen.getByText('Testiurl')
  expect(element3).toBeDefined()
  const element4 = screen.getByText('likes 100')
  expect(element4).toBeDefined()
  expect(mockHandler.mock.calls).toHaveLength(0)
})

test('clicking the like button twice calls event handler twice', async () => {
  const mockHandler = jest.fn()

  render(<Blog blog={blog} handleUpdateBlog={mockHandler} />)
  const ShowAllButton = screen.getByText('Testiotsikko')
  await user.click(ShowAllButton)
  const likeButton = screen.getByText('like')
  expect(likeButton).toBeDefined()
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
