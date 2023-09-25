//Define the listHelper constant containing the function to be tested.
const listHelper = require('../utils/list_helper')

//Test if the dummy function of listHelper returns number one.
test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})
