/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'


describe('When a Blog object is rendered', () => {

    //Ignoring the errors related to PropTypes.
    const loggedErrors = console.error.bind(console.error)
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
    test('it renders content', () => {
        const blog = {
            title: 'A testable blog.',
            author: 'TesterJester',
            url: 'http://www.testingwhilejesting.com',
            likes: 2340
        }

        render(<Blog blog={blog} />)

        let element = screen.getByText('A testable blog.')
        expect(element).toBeDefined()
        expect(element).toBeInTheDocument()
        element = screen.getByText('Title:')
        expect(element).toBeDefined()
        expect(element).toBeInTheDocument()
        expect(screen.getByTestId('blogInfo')).toHaveStyle('display: none')

        /*Testing that trying to get the author, url and likes fields with the method
        getbyText results in an error. */
        expect(() => screen.getByText('Author: TesterJester')).toThrow()
        expect(() => screen.getByText('Url: http://www.testingwhilejesting.com')).toThrow()
        expect(() => screen.getByText('Likes: 2340')).toThrow()
    })
})