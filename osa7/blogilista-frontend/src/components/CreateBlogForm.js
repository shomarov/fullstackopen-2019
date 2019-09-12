import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { blogAddedNotification, hideNotification } from '../reducers/notificationReducer'

const CreateBlogForm = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('url')

  const clearFields = () => {
    title.clear()
    author.clear()
    url.clear()
  }

  const addBlog = async (event) => {
    event.preventDefault()
    props.toggleVisibility()

    const newBlog = {
      title: title.input.value,
      author: author.input.value,
      url: url.input.value
    }

    props.addBlog(newBlog)
    props.blogAddedNotification(newBlog.title, newBlog.author)

    setTimeout(() => {
      props.hideNotification()
    }, 5000)

    clearFields()
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input {...title.input} />
      </div>
      <div>
        author:
        <input {...author.input} />
      </div>
      <div>
        url:
        <input {...url.input} />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

const mapDispatchToProps = {
  addBlog,
  blogAddedNotification,
  hideNotification
}

export default connect(null, mapDispatchToProps)(CreateBlogForm)