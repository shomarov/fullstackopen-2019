import React from 'react'
import { render, waitForElement } from '@testing-library/react'
import App from './App'
jest.mock('./services/blogs')

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )

    await waitForElement(
      () => component.getAllByText('login')
    )

    // expectations here

    const loginForm = component.container.querySelector('.login')

    expect(loginForm).toBeDefined()

    const blogs = component.container.querySelector('.blog')

    expect(blogs).toBeNull()
  })

  test('blogs are rendered if user logged in', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedInUser', JSON.stringify(user))

    const component = render(
      <App />
    )

    await waitForElement(
      () => component.container.querySelector('.blog')
    )

    const blogs = component.container.querySelectorAll('.blog')

    expect(blogs.length).toBe(22)
  })
})