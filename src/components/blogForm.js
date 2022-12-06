import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const BlogForm = ({ setBlogs, setNotifMessage, setNewBlogVisible }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    blogService.create(newBlog).then((returnedBlog) => {
      setBlogs((prev) => prev.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotifMessage({
        type: 'notif',
        message: `A new blog: ${title} by ${author} has been added.`,
      })
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
    })
  }

  return (
    <form onSubmit={addBlog}>
      <h2>Create a new blog</h2>
      <div>
        title
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        author
        <input value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div>
        url
        <input value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>
      <button type="submit">Add</button>
      <button type="reset" onClick={() => setNewBlogVisible(false)}>Cancel</button>
    </form>
  )
}

BlogForm.propTypes = {
  setBlogs: PropTypes.func.isRequired,
  setNotifMessage: PropTypes.func.isRequired,
  setNewBlogVisible: PropTypes.func.isRequired,
}

export default BlogForm
