/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('When a Blog object is rendered', () => {

    /*Ignoring the errors related to PropTypes, defining
    a container variable for the querySelector and a blog
    to render. */
    const loggedErrors = console.error.bind(console.error)
    let container
    const blog = {
        title: 'A testable blog.',
        author: 'TesterJester',
        url: 'http://www.testingwhilejesting.com',
        likes: 2340
    }

    beforeAll(() => {
        console.error = errorMsg => {

            { errorMsg.toString().includes('Warning: Failed prop type:') && loggedErrors(errorMsg) }
        }

    })

    afterAll(() => {
        console.error = loggedErrors
    })

    /*Testing that when a Blog component is rendered, only the title is shown.
    author, likes and url fields are ignored because of the visibility being
    set to false by default. */
    test('it initially renders title, but other values are hidden.', () => {

        render(<Blog blog={blog} />)

        let element = screen.getByText('A testable blog.')
        expect(element).toBeDefined()
        expect(element).toBeInTheDocument()
        element = screen.getByText('Title:')
        expect(element).toBeDefined()
        expect(element).toBeInTheDocument()

        //Testing that the div containing the author, likes and url fields is initially hidden.
        expect(screen.getByTestId('blogInfo')).toHaveStyle('display: none')

    })


    /*Testing that when a Blog component is rendered, only the title is shown by default.
    Author, likes and url fields are also shown when the button is pressed and the label of the button
    is also switched correctly. Also testing that the blog information can be hidden by clicking on the title
    of the blog. */
    test('clicking the view button shows the other values of the blog besides the title', async () => {

        /*Testing that before the clicking the button the title is rendered, but the
        div containing the author, likes and url fields is initially hidden. */
        container = render(<Blog blog={blog} />).container

        let element = screen.getByText('A testable blog.')
        expect(element).toBeDefined()
        expect(element).toBeInTheDocument()
        element = screen.getByText('Title:')
        expect(element).toBeDefined()
        expect(element).toBeInTheDocument()

        const div = container.querySelector('.blogInfoContainer')

        expect(div).toHaveStyle('display: none')

        const user = userEvent.setup()

        const button = screen.getByText('View')

        //Clicking the "View" button.
        await user.click(button)

        /*Testing that after pressing the "View" button, the div containing the author,
        likes and url fields is no longer hidden. */
        expect(button).toHaveTextContent('Hide')
        expect(screen.getByTestId('blogInfo')).toHaveTextContent('Author:')
        expect(screen.getByTestId('blogInfo')).toHaveTextContent('TesterJester')
        expect(screen.getByTestId('blogInfo')).toHaveTextContent('Url:')
        expect(screen.getByTestId('blogInfo')).toHaveTextContent('http://www.testingwhilejesting.com')
        expect(screen.getByTestId('blogInfo')).toHaveTextContent('Likes:')
        expect(screen.getByTestId('blogInfo')).toHaveTextContent('2340')
        expect(div).not.toHaveStyle('display: none')

        element = screen.findByText('TesterJester')
        expect(element).toBeDefined()
        element = screen.findByText('http://www.testingwhilejesting.com')
        expect(element).toBeDefined()
        element = screen.findByText('2340')
        expect(element).toBeDefined()

        /*Testing that after the clicking the title of the blog, the div containing
        the author, likes and url fields is initially hidden again. */
        element = screen.getByText('A testable blog.')

        await user.click(element)

        expect(button).toHaveTextContent('View')
        expect(div).toHaveStyle('display: none')

    })

    /*Testing that when the like button is clicked twice, the mock function provided as
    an event handler is also called twice. */
    describe('When a Blog object is rendered and the like button is pressed', () => {

        test('The function is called the correct number of times.', async () => {

            const mockHandler = jest.fn()

            render(<Blog blog={blog} updateMethod={mockHandler} />)

            const user = userEvent.setup()
            const button = screen.getByText('Like')

            await user.click(button)
            await user.click(button)

            expect(mockHandler.mock.calls).toHaveLength(2)

        })
    })

})
