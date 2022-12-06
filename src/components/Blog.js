import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setNotifMessage, setBlogs, user }) => {
  const [visible, setVisible] = useState(false)

  const addLike = () => {
    const updatedBlog = {
      user: blog.user.id,
      title: blog.title,
      url: blog.url,
      author: blog.author,
      likes: blog.likes + 1,
    }
    blogService.update(blog.id, updatedBlog).then(() => {
      blogService
        .getAll()
        .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
      setNotifMessage({
        type: 'notif',
        message: `You liked the blog: ${blog.title} by ${blog.author}.`,
      })
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
    })
  }

  const handleDelete = () => {
    if (window.confirm(`Remove the blog: ${blog.title} by ${blog.author}`)) {
      blogService.remove(blog.id).then(() => {
        blogService
          .getAll()
          .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
        setNotifMessage({
          type: 'notif',
          message: `${blog.title} by ${blog.author} has been successfully deleted.`,
        })
        setTimeout(() => {
          setNotifMessage(null)
        }, 5000)
      })
    }
  }

  return (
    <div style={{ border: '1px solid black', margin: '5px', padding: 2 }}>
      <b>{blog.title}</b> by {blog.author}{' '}
      {visible ? (
        <button onClick={() => setVisible(false)}>Hide</button>
      ) : (
        <button onClick={() => setVisible(true)}>View</button>
      )}
      {visible && (
        <>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            Likes : {blog.likes}
            <button onClick={addLike}>+1</button>
          </div>
          <div>{blog.user.name}</div>
          {user.username === blog.user.username && (
            <button
              style={{
                backgroundColor: 'crimson',
                color: 'white',
                borderRadius: 3,
              }}
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default Blog
