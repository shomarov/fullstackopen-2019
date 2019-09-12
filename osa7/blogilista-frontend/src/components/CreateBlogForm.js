import React, { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    props.toggleVisibility()

    const newBlog = { title, author, url }

    const returnedBlog = await blogService.create(newBlog)

    props.setBlogs(props.blogs.concat(returnedBlog))
    props.setNotification(`a new blog ${title} by ${author} added`)

    setTimeout(() => {
      props.setNotification(null)
    }, 5000)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="URL"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default CreateBlogForm