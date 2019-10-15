describe('Blogilista', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')

    const user = {
      name: 'Superuser',
      username: 'root',
      password: 'password'
    }

    cy.request('POST', 'http://localhost:3000/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Blogilista')
  })

  describe('when not logged in', function () {
    it('login form can be opened', function () {
      cy.contains('login')
        .click()
    })

    it('user can login', function () {
      cy.contains('login')
        .click()
      cy.get('#username')
        .type('root')
      cy.get('#password')
        .type('password')
      cy.get('#loginButton')
        .click()
      cy.contains('blog app')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('login')
        .click()
      cy.get('#username')
        .type('root')
      cy.get('#password')
        .type('password')
      cy.get('#loginButton')
        .click()
    })

    it('name of the user is shown', function () {
      cy.contains('Superuser logged in')
    })

    it('a new blog can be created', function () {
      cy.get('#createNewBlogButton')
        .click()
      cy.get('#title')
        .type('Title of test blog')
      cy.get('#author')
        .type('Author of test blog')
      cy.get('#url')
        .type('http://localhost:1337/testurl')
      cy.get('#submitButton')
        .click()
      cy.contains('a new blog Title of test blog by Author of test blog added')
    })

    describe('and a blog is created', function () {
      it('a new blog can be liked', function () {
        cy.get('#createNewBlogButton')
          .click()
        cy.get('#title')
          .type('Title of test blog')
        cy.get('#author')
          .type('Author of test blog')
        cy.get('#url')
          .type('http://localhost:1337/testurl')
        cy.get('#submitButton')
          .click()
        cy.contains('Title of test blog Author of test blog')
          .click()
        cy.get('#likeBlogButton')
          .click()
        cy.contains('1 likes')
      })
    })

    it('user can log out', function () {
      cy.get('#logoutButton')
        .click()
      cy.contains('login')
    })
  })

})
