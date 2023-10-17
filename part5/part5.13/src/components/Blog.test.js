/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('When a Blog object is rendered', () => {

    //Ignoring the errors related to PropTypes.
    const loggedErrors = console.error.bind(console.error)

    beforeAll(() => {
        console.error = errorMsg => {

            { errorMsg.toString().includes('Warning: Failed prop type:') && loggedErrors(errorMsg) }
        }

    })

    //Defining the blog to render and rendering it before each test.
    beforeEach(() => {
        const blog = {
            title: 'A testable blog.',
            author: 'TesterJester',
            url: 'http://www.testingwhilejesting.com',
            likes: 2340
        }

        render(<Blog blog={blog} />)
    })

    afterAll(() => {
        console.error = loggedErrors
    })

    /*Testing that when a Blog component is rendered, only the title is shown.
    author, likes and url fields are hidden because of the visibility being
    set to false by default. */
    test('it initially renders title, but other values are hidden.', () => {

        let element = screen.getByText('A testable blog.')
        expect(element).toBeDefined()
        expect(element).toBeInTheDocument()
        element = screen.getByText('Title:')
        expect(element).toBeDefined()
        expect(element).toBeInTheDocument()

        //Testing that the div containing the author, likes and url fields is initially hidden.
        expect(screen.getByTestId('blogInfo')).toHaveStyle('display: none')
        expect(screen.queryByText('TesterJester')).toBeNull()
        expect(screen.queryByText('http://www.testingwhilejesting.com')).toBeNull()
        expect(screen.queryByText('2340')).toBeNull()
    })

})
