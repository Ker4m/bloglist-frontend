describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Blog App')
    cy.contains('Log in to application')
  })


  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('admin')
      cy.get('#password').type('admin')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'Matti Luukkainen logged-in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })

      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('.title-form').type('Blog Test')
      cy.get('.author-form').type('Cypress')
      cy.get('.url-form').type('https://www.example.com/blog')
      cy.get('.submit-blog-form').click()
      cy.contains('A new blog: Blog Test by Cypress has been added.')

    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Blog Test',
          author: 'Cypress',
          url: 'https://www.example.com/blog',
        })
      })

      it('it can be liked', function () {
        cy.contains('View').click()
        cy.contains('Likes : 0')
        cy.contains('+1').click()
        cy.contains('You liked the blog: Blog Test by Cypress.')
        cy.contains('Likes : 1')
      })

      it('it can be deleted', function () {
        cy.contains('View').click()
        cy.contains('Delete').click()
        cy.get('.notif')
          .should('contain', 'Blog Test by Cypress has been successfully deleted.')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
        cy.visit('http://localhost:3000')
        cy.get('html').should('not.contain', 'Blog Test by Cypress')
      })
    })
    it('Blogs are ordered according to likes', function() {
      cy.createBlog({
        title: 'Blog 4',
        author: 'Cypress1',
        url: 'https://www.example.com/blog',
      })
      cy.createBlog({
        title: 'Blog 1',
        author: 'Cypress2',
        url: 'https://www.example.com/blog',
        likes: 99
      })
      cy.createBlog({
        title: 'Blog 3',
        author: 'Cypress3',
        url: 'https://www.example.com/blog',
        likes: 35
      })
      cy.createBlog({
        title: 'Blog 2',
        author: 'Cypress4',
        url: 'https://www.example.com/blog',
        likes: 76
      })

      cy.get('#blog-list').eq(0).should('contain', 'Blog 1 by Cypress2')
      cy.get('#blog-list').eq(0).should('contain', 'Blog 2 by Cypress4')
      cy.get('#blog-list').eq(0).should('contain', 'Blog 3 by Cypress3')
      cy.get('#blog-list').eq(0).should('contain', 'Blog 4 by Cypress1')

    })

  })

})