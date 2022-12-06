import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import BlogForm from './blogForm'
import userEvent from '@testing-library/user-event'

test('renders the new blog form ', async () => {
  const handleNewBlog = jest.fn()
  const setNewBlogVisible = jest.fn()

  const { container } = render(
    <BlogForm  handleNewBlog={handleNewBlog} setNewBlogVisible={setNewBlogVisible}/>
  )
  const tester = userEvent.setup()

  const newBlog = {
    title: 'Blog Title',
    author: 'Blog Author',
    url: 'https://www.example.com/blog',
  }

  const title_input = container.querySelector('.title-form')
  const author_input = container.querySelector('.author-form')
  const url_input = container.querySelector('.url-form')

  await tester.type(title_input, newBlog.title)
  await tester.type(author_input, newBlog.author)
  await tester.type(url_input, newBlog.url)

  const show_btn = container.querySelector('.submit-blog-form')
  await tester.click(show_btn)

  expect(handleNewBlog.mock.calls).toHaveLength(1)
  expect(handleNewBlog.mock.calls[0][0].title).toBe(newBlog.title)
  expect(handleNewBlog.mock.calls[0][0].author).toBe(newBlog.author)
  expect(handleNewBlog.mock.calls[0][0].url).toBe(newBlog.url)


})