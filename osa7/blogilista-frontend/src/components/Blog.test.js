import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'My first blog',
      author: 'Superuser',
      url: 'localhost',
      likes: 20,
      user: {
        username: 'root',
        name: 'Superuser',
        id: '5d2b717c9e3248562ed6c631'
      },
      id: '5d2eb69b23924625b144e975'
    }

    const user = {
      username: 'root',
      name: 'Superuser',
      id: '5d2b717c9e3248562ed6c631'
    }

    const mockHandler = jest.fn()

    component = render(
      <Blog blog={blog} user={user} onClick={mockHandler} />
    )
  })

  test('renders title and author', () => {
    const element = component.container.querySelector('.titleAuthor')
    expect(element).toHaveTextContent('My first blog Superuser')
  })

  test('at start the children are not displayed', () => {
    const element = component.container.querySelector('.otherInfo')
    expect(element).toHaveStyle('display: none')
  })

  test('after clicking the blog once other info displayed', () => {
    const titleAuthor = component.container.querySelector('.titleAuthor')
    fireEvent.click(titleAuthor)
    const otherInfo = component.container.querySelector('.otherInfo')
    expect(otherInfo).toHaveStyle(`display: ${''}`)
  })

})
