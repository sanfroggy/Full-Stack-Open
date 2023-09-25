//Define the listHelper constant containing the function to be tested.
const listHelper = require('../utils/list_helper')

/*Defining a describe block to contain the test cases related to totalLikes
function in list_helper file. */
describe('total likes', () => {

    //Testing the function with an empty array.
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    const listWithOneBlog = [
        {
            _id: "6511122debb75668b4bab11e",
            title: "Lifestyle",
            author: "J. J. Jackson",
            url: "http://www.onetoomanylifestyleblogs.com",
            likes: 250,
            __v: 0
        }
    ]

    //Testing the function with an array containing one entry.
    test('when list has only one blog equals the likes of that blog', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(250)
    })

    const listWithMultipleBlogs = [
        {
            _id: "6511122debb75668b4bab11e",
            title: "Lifestyle",
            author: "J. J. Jackson",
            url: "http://www.onetoomanylifestyleblogs.com",
            likes: 250,
            __v: 0
        },
        {
            _id: "65111421ce4be049a04c9902",
            title: "Random blog about any and everything",
            author: "Whoknows",
            url: "http://www.readthis.org",
            likes: 15200,
            __v: 0
        },
        {
            _id: "6511d78154d4613e7b762b00",
            title: "A blog",
            author: "San",
            url: "http://www.myblog.com",
            likes: 15200,
            __v: 0
        }
    ]

    //Testing the function with an array containing multiple entries.
    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithMultipleBlogs)
        expect(result).toBe(30650)
    })
})
