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

module.exports = {
    dummy,
    totalLikes
}
