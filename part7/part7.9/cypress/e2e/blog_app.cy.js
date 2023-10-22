describe('When blog app frontend is visited', function () {
    /*Emptying the database from User and Blog objects and
    visiting the "http://localhost:3000" defined in the configuration
    file as baseUrl, before each test. Also creating a new user to test
    logging in. */
    beforeEach(function () {
        cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);

        const user = {
            username: 'SanTheBlogger',
            name: 'Sampson',
            password: 'Salasana92',
        };

        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);

        const falseuser = {
            username: 'UnauthorizedSan',
            name: 'FakeSampson',
            password: 'Salis468',
        };

        cy.request('POST', `${Cypress.env('BACKEND')}/users`, falseuser);
        cy.visit('/');
    });

    /*Testing that the login form is shown by default when the frontend
    url is visited. */
    it('login form is shown by default', function () {
        cy.contains('Login');
        cy.contains('Log in to application:');
        cy.contains('Username:');
        cy.contains('Password:');
    });

    describe('When user attempts to login', function () {
        /*Testing that an existing user can login via the custom command
        connecting directly to the backend. */
        it('user can login with correct credentials via custom command', function () {
            cy.contains('Login');
            cy.login({ username: 'SanTheBlogger', password: 'Salasana92' });

            cy.contains('Currently logged in as Sampson.');
        });

        /*Testing that an existing user cannot login via the custom command
        connecting with invalid credentials. */
        it('user cannot login with incorrect credentials via custom command', function () {
            cy.loginWithResponse({ username: 'SanTheBlogger', password: 'VääräSalis' }).should('eq', 401);
            cy.contains('Currently logged in as Sampson.').should('not.exist');
        });

        /*Testing that an existing user can login via the login form. */
        it('user can login with correct credentials via login form', function () {
            cy.contains('Login');
            cy.get('#usrInput').type('SanTheBlogger');
            cy.get('#pwdInput').type('Salasana92');
            cy.get('#loginBtn').click();
            cy.contains('Currently logged in as Sampson.');
        });

        /*Testing that an existing user can login via the login form and
        that invalid user data produces a failed login attempt.  */
        it('login fails and error message is shown with invalid credentials', function () {
            cy.contains('Login');
            cy.get('#usrInput').type('SanTheBlogger');
            cy.get('#pwdInput').type('VääräSalis');
            cy.get('#loginBtn').click();
            cy.get('.errorMsg')
                .should('contain', 'Invalid username or password')
                .and('have.css', 'color', 'rgb(139, 0, 0)')
                .and('have.css', 'border-style', 'solid');
            cy.contains('Currently logged in as Sampson.').should('not.exist');
        });
    });

    describe('When a user is logged in', function () {
        //Logging in with correct credentials before each test.
        beforeEach(function () {
            cy.login({ username: 'SanTheBlogger', password: 'Salasana92' });
        });

        /*Testing that an existing user can add a blog via the new blog form and
        that the form is added to the list of blogs and a correct type of message
        is shown.  */
        it('that user can create a blog', function () {
            cy.contains('New blog').click();
            cy.get('#titleInput').type('Photography');
            cy.get('#authorInput').type('Hobbyist');
            cy.get('#urlInput').type('http://www.abeatifulworld.com');
            cy.get('#newBlogBtn').click();
            cy.get('.successMsg')
                .should('contain', 'Photography was successfully created.')
                .and('have.css', 'color', 'rgb(0, 128, 0)')
                .and('have.css', 'border-style', 'solid');
            cy.contains('Photography');
        });

        describe('and when a blog is already created', function () {
            /*Creating a new blog as the currently logged in user
            before each test. */
            beforeEach(function () {
                cy.createBlog({
                    title: 'Photography',
                    author: 'Hobbyist',
                    url: 'http://www.abeatifulworld.com',
                });
            });

            /*Testing that when a new blog is added the like button exists and can be clicked.
            Clicking the like button adds one more like to the likes of the correct blog. */
            it('that blog can be liked', function () {
                cy.createBlog({
                    title: 'A jedi master i am',
                    author: 'Yoda',
                    url: 'http://www.readorreadnot.com',
                });

                cy.contains('Photography').parent().contains('View').as('viewButton');
                cy.contains('Photography').parent().contains('Likes:').parent().should('contain', '0');

                cy.get('@viewButton').click().parent().find('button').contains('Like').as('likeButton');
                cy.get('@likeButton').click();
                cy.contains('Photography').parent().contains('Likes:').parent().should('contain', '1');
                cy.contains('Photography').parent().contains('Likes:').parent().should('not.contain', '0');

                cy.get('@likeButton').click();
                cy.contains('Photography').parent().contains('Likes:').parent().should('contain', '2');
            });

            /*Testing that when a a blog exists and is added by the currently logged in user
            it can also be removed by the currently logged in user, by clicking the "Remove" button. */
            it('blog can be removed by the user that added it', function () {
                cy.get('#blogsContainer').should('contain', 'Photography');
                cy.contains('Photography').parent().contains('View').as('viewButton');
                cy.get('@viewButton').click().parent().find('button').contains('Remove').as('removeButton');
                cy.get('@removeButton').click();
                cy.get('.successMsg')
                    .should('contain', 'Photography was successfully deleted.')
                    .and('have.css', 'color', 'rgb(0, 128, 0)')
                    .and('have.css', 'border-style', 'solid');
                cy.get('#blogsContainer').should('not.contain', 'Photography');
            });

            /*Testing that when a blog exists the currently logged in user can only see the
            "Remove" button if it is the same user thar added the blog in question. */
            it('only the user who created the blog can see the remove button', function () {
                cy.login({ username: 'UnauthorizedSan', password: 'Salis468' });
                cy.get('#blogsContainer').should('contain', 'Photography');
                cy.contains('Photography').parent().contains('View').as('viewButton');
                cy.get('@viewButton').click().parent().find('button').should('not.contain', 'Remove');
                cy.should('not.contain', 'Remove');

                cy.createBlog({ title: 'Life of a Sith Lord', author: 'Insidious', url: 'http://www.palprules.com' });

                cy.login({ username: 'SanTheBlogger', password: 'Salasana92' });
                cy.get('#blogsContainer').should('contain', 'Photography');
                cy.should('contain', 'Remove');
                cy.contains('Photography').parent().contains('View').as('viewButton');
                cy.get('@viewButton').click().parent().find('button').contains('Remove').as('removeButton');
                cy.get('@removeButton').click();
                cy.get('.successMsg')
                    .should('contain', 'Photography was successfully deleted.')
                    .and('have.css', 'color', 'rgb(0, 128, 0)')
                    .and('have.css', 'border-style', 'solid');
                cy.get('#blogsContainer').should('not.contain', 'Photography');

                cy.get('#blogsContainer').should('contain', 'Life of a Sith Lord');
                cy.contains('Life of a Sith Lord').parent().contains('View').as('viewButton');
                cy.get('@viewButton').click().parent().find('button').should('not.contain', 'Remove');
                cy.should('not.contain', 'Remove');

                cy.login({ username: 'UnauthorizedSan', password: 'Salis468' });
                cy.get('#blogsContainer').should('contain', 'Life of a Sith Lord');
                cy.should('contain', 'Remove');
                cy.contains('Life of a Sith Lord').parent().contains('View').as('viewButton');
                cy.get('@viewButton').click().parent().find('button').contains('Remove').as('removeButton');
                cy.get('@removeButton').click();
                cy.get('.successMsg')
                    .should('contain', 'Life of a Sith Lord was successfully deleted.')
                    .and('have.css', 'color', 'rgb(0, 128, 0)')
                    .and('have.css', 'border-style', 'solid');
                cy.get('#blogsContainer').should('not.contain', 'Life of a Sith Lord');
            });

            /*Testing that when multiple blogs exists they are sorted according to their likes.
            Also testing that whenever any operation is made, which would alter the order 
            the blogs are resorted accordingly. */
            it('when there are multiple, the blogs are sorted according to likes', function () {
                cy.createBlog({
                    title: 'A jedi master am i',
                    author: 'Yoda',
                    url: 'http://www.readorreadnot.com',
                });

                cy.createBlog({ title: 'Life of a Sith Lord', author: 'Insidious', url: 'http://www.palprules.com' });
                cy.contains('A jedi master am i').parent().contains('View').as('viewButton');
                cy.get('@viewButton').click().parent().find('button').contains('Like').as('likeButton');
                cy.get('@likeButton').click();
                cy.contains('A jedi master am i').parent().contains('Likes:').parent().should('contain', '1');
                cy.contains('Life of a Sith Lord').parent().contains('View').as('viewButton');
                cy.get('@viewButton').click().parent().find('button').contains('Like').as('likeButton');
                cy.get('@likeButton').click();
                cy.contains('Life of a Sith Lord').parent().contains('Likes:').parent().should('contain', '1');
                cy.contains('A jedi master am i').parent().find('button').contains('Like').as('likeButton');
                cy.get('@likeButton').click();
                cy.contains('A jedi master am i').parent().contains('Likes:').parent().should('contain', '2');

                cy.get('.blogInfoContainer').eq(0).parent().should('contain', 'A jedi master am i');
                cy.get('.blogInfoContainer').eq(1).parent().should('contain', 'Life of a Sith Lord');
                cy.get('.blogInfoContainer').eq(2).parent().should('contain', 'Photography');

                cy.createBlog({
                    title: 'Life on the Death Star',
                    author: 'BlasterMan109',
                    url: 'http://www.diaryofastormtrooper.com',
                    likes: 3400,
                });

                cy.get('.blogInfoContainer').eq(0).parent().should('contain', 'Life on the Death Star');
                cy.get('.blogInfoContainer').eq(1).parent().should('contain', 'A jedi master am i');
                cy.get('.blogInfoContainer').eq(2).parent().should('contain', 'Life of a Sith Lord');
                cy.get('.blogInfoContainer').eq(3).parent().should('contain', 'Photography');

                cy.contains('Life of a Sith Lord').parent().contains('View').as('viewButton');
                cy.get('@viewButton').click().parent().find('button').contains('Remove').as('removeButton');
                cy.get('@removeButton').click();

                cy.get('.blogInfoContainer').eq(0).parent().should('contain', 'Life on the Death Star');
                cy.get('.blogInfoContainer').eq(1).parent().should('contain', 'A jedi master am i');
                cy.get('.blogInfoContainer').eq(2).parent().should('contain', 'Photography');
            });
        });
    });
});
