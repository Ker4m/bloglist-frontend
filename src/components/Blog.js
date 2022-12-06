import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [visible, setVisible] = useState(false)

  return (
    <div style={{ border: '1px solid black', margin: '5px', padding: 2 }}>
      <b className="blog-title">{blog.title}</b> by{' '}
      <span className="blog-author">{blog.author}</span>
      {visible ? (
        <button className="blog-hide-btn" onClick={() => setVisible(false)}>Hide</button>
      ) : (
        <button className="blog-view-btn" onClick={() => setVisible(true)}>View</button>
      )}
      {visible && (
        <>
          <div>
            <a className="blog-url" href={blog.url}>{blog.url}</a>
          </div>
          <div className="blog-likes">
            Likes : {blog.likes}
            <button className="blog-like-btn" onClick={() => handleLike(blog)}>+1</button>
          </div>
          <div>{blog.user.name}</div>
          {user.username === blog.user.username && (
            <button
              style={{
                backgroundColor: 'crimson',
                color: 'white',
                borderRadius: 3,
              }}
              className="blog-del-btn"
              onClick={() => handleDelete(blog)}
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
