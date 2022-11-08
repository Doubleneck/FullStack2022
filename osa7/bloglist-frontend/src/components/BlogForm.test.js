import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const input1 = screen.getByPlaceholderText('write here blog title')
  const input2 = screen.getByPlaceholderText('write here blog author')
  const input3 = screen.getByPlaceholderText('write here blog url')
  const sendButton = screen.getByText('save')

  await user.type(input1, 'testing a form 1')
  await user.type(input2, 'testing a form 2')
  await user.type(input3, 'testing a form 3')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form 1')
  expect(createBlog.mock.calls[0][0].author).toBe('testing a form 2')
  expect(createBlog.mock.calls[0][0].url).toBe('testing a form 3')
})
