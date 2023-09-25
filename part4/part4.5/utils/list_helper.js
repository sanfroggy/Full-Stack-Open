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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
