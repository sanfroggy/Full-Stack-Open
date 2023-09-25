/*Create and export a dummy function to test the 
test configuration. */
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce((a, b) => a + b.likes, 0)
    return total
}

module.exports = {
    dummy,
    totalLikes
}
