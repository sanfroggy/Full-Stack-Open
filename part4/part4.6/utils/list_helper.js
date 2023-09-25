/*Create and export a dummy function to test the 
test configuration. */
const dummy = (blogs) => {
    return 1
}

/*Create and export a totalLikes function to calculate the
total number of likes in a received array of blogs. */
const totalLikes = (blogs) => {
    const total = blogs.reduce((a, b) => a + b.likes, 0)
    return total
}

/*Create and export a favoriteBlog function to return the
blog object with the most likes in an array of blogs. */
const favoriteBlog = (blogs) => {
    if (blogs.length > 0) {
        return blogs.reduce((a, b) => a.likes > b.likes ? a : b)
    } else {
        return null
    }
}

/*Create and export a mostBlogs function to return the
an object containing the name of the author with the most blogs 
and the number of blogs under his name. */
const mostBlogs = (blogs) => {
    if (blogs.length > 0) {
        const authors = [...new Set(blogs.map(blog => blog.author))]
        let blogcount = Array(authors.length).fill(0)

        for (var i = 0; i < authors.length; i++) {
            blogs.forEach(blog => {
                if (blog.author === authors[i]) {
                    blogcount[i] += 1
                }
            })
        }

        const mostblogs = blogcount.indexOf(blogcount.reduce((a, b) => Math.max(a, b), -Infinity))

        const mostBloggedAuthor = {
            author: authors[mostblogs],
            blogs: blogcount[mostblogs]
        }
        return mostBloggedAuthor
    } else {
        return null
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}
