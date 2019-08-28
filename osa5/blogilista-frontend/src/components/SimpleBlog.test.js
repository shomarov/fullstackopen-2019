import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  let component
  let mockHandler

  beforeEach(() => {
    const blog = {
      title: 'test title',
      author: 'test author',
      likes: 5
    }

    mockHandler = jest.fn()

    component = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )
  })

  test('renders blog title', () => {
    const element = component.container.querySelector('.titleAuthor')
    expect(element).toHaveTextContent('test title')
  })

  test('renders blog author', () => {
    const element = component.container.querySelector('.titleAuthor')
    expect(element).toHaveTextContent('test author')
  })

  test('renders blog likes amount', () => {
    const element = component.container.querySelector('.likes')
    expect(element).toHaveTextContent('5')
  })

  test('after clicking the like button twice, the event handler gets called twice', () => {
    const button = component.container.querySelector('.likesButton')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls.length).toBe(2)
  })

})

test('after clicking the like button twice, amount of likes increases by 2', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    likes: 5
  }

  const onClick = () => {
    blog.likes = blog.likes + 1
  }

  let component = render(
    <SimpleBlog blog={blog} onClick={onClick} />
  )

  const button = component.container.querySelector('.likesButton')
  fireEvent.click(button)
  fireEvent.click(button)

  component = render(
    <SimpleBlog blog={blog} onClick={onClick} />
  )

  const likes = component.container.querySelector('.likes')

  expect(likes).toHaveTextContent('7')
})

