//Define the listHelper constant containing the function to be tested.
const listHelper = require('../utils/list_helper')

describe('most blogs', () => {
    //Testing the function with an empty array.
    test('of empty list is null', () => {
        const result = listHelper.mostBlogs([])
        expect(result).toEqual(null)
    })

    const listWithOneBlog = [
        {
            _id: '6511122debb75668b4bab11e',
            title: 'Lifestyle',
            author: 'J. J. Jackson',
            url: 'http://www.onetoomanylifestyleblogs.com',
            likes: 250,
            __v: 0,
        },
    ]

    //Testing the function with an array containing one entry.
    test('when list has only one blog equals that blog', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        expect(result).toEqual({
            author: 'J. J. Jackson',
            blogs: 1,
        })
    })

    let listWithMultipleBlogs = [
        {
            _id: '6511122debb75668b4bab11e',
            title: 'Lifestyle',
            author: 'J. J. Jackson',
            url: 'http://www.onetoomanylifestyleblogs.com',
            likes: 1520,
            __v: 0,
        },
        {
            _id: '65111421ce4be049a04c9902',
            title: 'Random blog about any and everything',
            author: 'Whoknows',
            url: 'http://www.readthis.org',
            likes: 15200,
            __v: 0,
        },
        {
            _id: '6511d78154d4613e7b762b00',
            title: 'A blog',
            author: 'San',
            url: 'http://www.myblog.com',
            likes: 15200,
            __v: 0,
        },
        {
            _id: '6521d78154d4613e7b762b00',
            title: 'A new blog',
            author: 'San',
            url: 'http://www.mynewblog.com',
            likes: 122,
            __v: 0,
        },
    ]

    //Testing the function with an array containing multiple entries.
    test('of a bigger list equals the author with most blogs', () => {
        const result = listHelper.mostBlogs(listWithMultipleBlogs)
        expect(result).toEqual({
            author: 'San',
            blogs: 2,
        })
    })

    const newBlog = {
        _id: '6521d78154d4613e7b762c00',
        title: 'Lifestyle Part 2.',
        author: 'J. J. Jackson',
        url: 'http://www.twotoomanylifestyleblogs.com',
        likes: 1220,
        __v: 0,
    }

    /*Testing the function with an array containing multiple entries with
    two authors having equally many blogs. Because of how the function is written
    the one that is before the other in the array is expected to be returned. */
    test('of a bigger list with two authors with most blogs', () => {
        listWithMultipleBlogs = [...listWithMultipleBlogs].concat(newBlog)
        const result = listHelper.mostBlogs(listWithMultipleBlogs)
        expect(result).toEqual({
            author: 'J. J. Jackson',
            blogs: 2,
        })
    })

    const anotherNewBlog = {
        _id: '6521d08154d4613e7b762b00',
        title: 'Another new blog.',
        author: 'San',
        url: 'http://www.anewblogagain.com',
        likes: 1220,
        __v: 0,
    }

    //Testing the function again with an array containing multiple entries.
    test('of a bigger list equals the author with most blogs again', () => {
        listWithMultipleBlogs = listWithMultipleBlogs.concat(anotherNewBlog)
        const result = listHelper.mostBlogs(listWithMultipleBlogs)
        expect(result).toEqual({
            author: 'San',
            blogs: 3,
        })
    })
})
