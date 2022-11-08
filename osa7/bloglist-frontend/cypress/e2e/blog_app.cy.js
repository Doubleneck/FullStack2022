describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Tero Testaaja',
      username: 'ttestaaja',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
  })

  it('Login form is shown', function() {
    cy.contains('log in')
  })

  it('login fails with wrong password', function() {
    cy.contains('log in').click()
    cy.get('#username').type('ttestaaja')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()
    cy.contains('wrong credentials')
  })

  it('login succees', function() {
    cy.contains('log in').click()
    cy.get('#username').type('ttestaaja')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
    cy.contains('Tero Testaaja')
  })


  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'ttestaaja', password: 'salainen' })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a title created by cypress')
      cy.get('#author').type('an author created by cypress')
      cy.get('#url').type('an url created by cypress')
      cy.contains('save').click()
      cy.contains('a title created by cypress')
    })


    describe('when created blog', function() {
      beforeEach(function() {
        cy.contains('new blog').click()
        cy.get('#title').type('a title created by cypress')
        cy.get('#author').type('an author created by cypress')
        cy.get('#url').type('an url created by cypress')
        cy.contains('save').click()
      })

      it('a new blog can be liked', function() {
        cy.contains('a title created by cypress')
        cy.get('#showAll').click()
        cy.get('#like').click()
        cy.contains('likes 1')
      })

      it('a new blog can be deleted by user', function() {
        cy.contains('a title created by cypress')
        cy.login({ username: 'ttestaaja', password: 'salainen' })
        cy.get('#showAll').click()
        cy.get('#delete').click()
        cy.get('#logout').click()
        cy.contains('Removing a title created by cypress ')
      })
    })
  })
})