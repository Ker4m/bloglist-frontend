import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/blogForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [newBlogVisible, setNewBlogVisible] = useState(false)
  const hideWhenVisible = { display: newBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: newBlogVisible ? '' : 'none' }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notifMessage, setNotifMessage] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotifMessage({ type: 'error', message: 'Wrong username or password' })
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const handleLike = (blog) => {
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

  const handleDelete = (blog) => {
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

  const handleNewBlog = ({ title, author, url }, event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    blogService.create(newBlog).then((returnedBlog) => {
      setBlogs((prev) => prev.concat(returnedBlog))
      setNotifMessage({
        type: 'notif',
        message: `A new blog: ${title} by ${author} has been added.`,
      })
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
    })
  }

  const blogDisplay = () => (
    <>
      <h2>Blog List</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleDelete={handleDelete}
          handleLike={handleLike}
          user={user}
        />
      ))}
    </>
  )

  return (
    <div>
      <Notification info={notifMessage} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={handleLogout}>Log out</button>
          <div style={showWhenVisible}>
            <BlogForm
              handleNewBlog={handleNewBlog}
              setNewBlogVisible={setNewBlogVisible}
            />
          </div>
          <div style={hideWhenVisible}>
            <button className="show-blog-form" onClick={() => setNewBlogVisible(true)}>New blog</button>
          </div>

          {blogDisplay()}
        </div>
      )}
    </div>
  )
}

export default App
