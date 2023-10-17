/* eslint-disable no-unused-vars */
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'

/*Testing that when the blog creation form is filled in and "Create" is
clicked a mock function is called and the callback function has the correct data. */
describe('When a new Blog object is created', () => {
    test('the callback function received is called with the proper data', async () => {

        const createBlog = jest.fn()

        const { container } = render(<NewBlogForm createMethod={createBlog} />)

        const user = userEvent.setup()
        const button = screen.getByText('Create')

        //Filling in the form and clicking "Create".
        const title = screen.getByPlaceholderText('Enter blog title here.')
        const author = container.querySelector('#authorInput')
        const url = screen.getByPlaceholderText('Enter blog url here.')

        await user.type(title, 'A testable blog.')
        await user.type(author, 'TesterJester.')
        await user.type(url, 'http://www.testingwhilejesting.com')

        await user.click(button)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('A testable blog.')
        expect(createBlog.mock.calls[0][0].author).toBe('TesterJester.')
        expect(createBlog.mock.calls[0][0].url).toBe('http://www.testingwhilejesting.com')
    })
})
