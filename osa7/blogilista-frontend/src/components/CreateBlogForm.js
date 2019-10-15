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
        <input id='title' {...title.input} />
      </div>
      <div>
        author:
        <input id='author' {...author.input} />
      </div>
      <div>
        url:
        <input id='url' {...url.input} />
      </div>
      <button id='submitButton' type="submit">create</button>
    </form>
  )
}


export default connect(
  null,
  {
    addBlog,
    blogAddedNotification,
    hideNotification
  }
)(CreateBlogForm)