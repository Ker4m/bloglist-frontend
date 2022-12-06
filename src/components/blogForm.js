import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleNewBlog, setNewBlogVisible }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  return (
    <form onSubmit={(event) => {
      handleNewBlog({ title, author, url },event)
      setTitle('')
      setAuthor('')
      setUrl('')}}>
      <h2>Create a new blog</h2>
      <div>
        title
        <input className="title-form" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        author
        <input className="author-form" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div>
        url
        <input className="url-form" value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>
      <button type="submit" className='submit-blog-form'>Add</button>
      <button type="reset" onClick={() => setNewBlogVisible(false)}>Cancel</button>
    </form>
  )
}

BlogForm.propTypes = {
  handleNewBlog: PropTypes.func.isRequired,
  setNewBlogVisible: PropTypes.func.isRequired,
}

export default BlogForm
