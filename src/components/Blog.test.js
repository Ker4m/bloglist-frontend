import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

const user = {
  username: 'test-user',
  name: 'test-user',
}
const blog = {
  title: 'Blog Title',
  author: 'Blog Author',
  url: 'https://www.example.com/blog',
  likes: 15,
  user: user
}

test('renders the blog title and author, but not the URL or number of likes by default', () => {
  const setNotifMessage = jest.fn()
  const setBlogs = jest.fn()


  const { container } = render(
    <Blog blog={blog} setNotifMessage={setNotifMessage} setBlogs={setBlogs} user={user} />
  )

  const span_title = container.querySelector('.blog-title')
  const span_author = container.querySelector('.blog-author')

  // Check that the title and author are rendered
  expect(span_title).toBeDefined()
  expect(span_author).toBeDefined()
  expect(span_title).toHaveTextContent(
    blog.title
  )
  expect(span_author).toHaveTextContent(
    blog.author
  )

  // Check that the URL and number of likes are not rendered by default
  //   expect(url).not.toBeDefined()
  expect(screen.queryByText(blog.url)).not.toBeInTheDocument()
  expect(screen.queryByText('Likes: 15')).not.toBeInTheDocument()
})

test('renders the blog URL and number of likes when the button is clicked', async () => {

  const setNotifMessage = jest.fn()
  const setBlogs = jest.fn()

  const { container } = render(
    <Blog blog={blog} setNotifMessage={setNotifMessage} setBlogs={setBlogs} user={user} />
  )

  const tester = userEvent.setup()
  const btn = container.querySelector('.blog-view-btn')

  // Click the button to show the details
  await tester.click(btn)

  // Check that the URL and number of likes are rendered
  expect(screen.getByText(blog.url)).toBeInTheDocument()
  expect(screen.getByText('Likes : 15')).toBeInTheDocument()
})