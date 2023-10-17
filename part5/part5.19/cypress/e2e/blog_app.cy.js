describe('When blog app frontend is visited', function () {

    /*Emptying the database from User and Blog objects and
    visiting the "http://localhost:3000" defined in the configuration
    file as baseUrl, before each test. Also creating a new user to test
    logging in. */
    beforeEach(function () {
        cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

        const user = {
            username: 'SanTheBlogger',
            name: 'Sampson',
            password: 'Salasana92'
        }

        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
        cy.visit('/')
    })

    /*Testing that the login form is shown by default when the frontend
    url is visited. */
    it('login form is shown by default', function () {
        cy.contains('Login')
        cy.contains('Log in to application:')
        cy.contains('Username:')
        cy.contains('Password:')
    })

    describe('When user attempts to login', function () {

        /*Testing that an existing user can login via the custom command
        connecting directly to the backend. */
        it('user can login with correct credentials via custom command', function () {
            cy.contains('Login')
            cy.login({ username: 'SanTheBlogger', password: 'Salasana92' })

            cy.contains('Currently logged in as Sampson.')

        })

        /*Testing that an existing user cannot login via the custom command
        connecting with invalid credentials. */
        it('user cannot login with incorrect credentials via custom command', function () {

            cy.loginWithResponse({ username: 'SanTheBlogger', password: 'VääräSalis' }).should( 'eq' , 401 )
            cy.contains('Currently logged in as Sampson.').should('not.exist')

        })

        /*Testing that an existing user can login via the login form. */
        it('user can login with correct credentials via login form',
            function () {
                cy.contains('Login')
                cy.get('#usrInput').type('SanTheBlogger')
                cy.get('#pwdInput').type('Salasana92')
                cy.get('#loginBtn').click()
                cy.contains('Currently logged in as Sampson.')
            })

        /*Testing that an existing user can login via the login form and
        that invalid user data produces a failed login attempt.  */
        it('login fails and error message is shown with invalid credentials',
            function () {
                cy.contains('Login')
                cy.get('#usrInput').type('SanTheBlogger')
                cy.get('#pwdInput').type('VääräSalis')
                cy.get('#loginBtn').click()
                cy.get('.errorMsg').
                    should('contain', 'Invalid username or password').
                    and('have.css', 'color', 'rgb(139, 0, 0)').
                    and('have.css', 'border-style', 'solid')
                cy.contains('Currently logged in as Sampson.').should('not.exist')
            })

    })

    describe('When a user is logged in', function () {

        //Logging in with correct credentials before each test.
        beforeEach(function () {
            cy.login({ username: 'SanTheBlogger', password: 'Salasana92' })
        })

        /*Testing that an existing user can add a blog via the new blog form and
        that the form is added to the list of blogs and a correct type of message
        is shown.  */
        it('that user can create a blog', function () {

            cy.contains('New blog').click()
            cy.get('#titleInput').type('Photography')
            cy.get('#authorInput').type('Hobbyist')
            cy.get('#urlInput').type('http://www.abeatifulworld.com')
            cy.get('#newBlogBtn').click()
            cy.get('.successMsg').
                should('contain', 'Photography was successfully created.').
                and('have.css', 'color', 'rgb(0, 128, 0)').
                and('have.css', 'border-style', 'solid')
            cy.contains('Photography')

        })
    })
})
