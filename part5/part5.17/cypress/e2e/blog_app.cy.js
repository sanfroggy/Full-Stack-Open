describe('When blog app frontend is visited', function () {

    /*Emptying the database from User and Blog objects and
    visiting the "http://localhost:3000" defined in the configuration 
    file as baseUrl, before each test. */
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.visit('/')
    })

    /*Testing that the login form is shown by default when the frontend
    url is visited. */
    it('login form is shown by default', function() {
        cy.contains('Login')
        cy.contains('Log in to application:')
        cy.contains('Username:')
        cy.contains('Password:')
    })
})
