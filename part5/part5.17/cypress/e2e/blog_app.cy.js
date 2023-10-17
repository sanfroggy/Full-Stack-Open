describe('When blog app frontend is visited', function () {

    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.visit('/')
    })

    it('login form is shown by default', function() {
        cy.contains('Login')
        cy.contains('Log in to application:')
        cy.contains('Username:')
        cy.contains('Password:')
    })
})