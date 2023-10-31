//Importing the necessary components.
import Authors from './components/Authors'
import Books from './components/Books'
import { Link, Route, Routes } from 'react-router-dom'
import NewBook from './components/NewBook'

const App = () => {

  //Returning Links and Routes used for page navigation.
  return (
    <div>
      <div>
        <Link to='/authors'>Authors</Link>&nbsp;&nbsp;&nbsp;
        <Link to='/books'>Books</Link>&nbsp;&nbsp;&nbsp;
        <Link to='/create'>Add book</Link>
          </div>

          <Routes>
              <Route path='/authors' element={<Authors />} />
              <Route path='/books' element={<Books />} />
              <Route path='/create' element={<NewBook />} />
          </Routes>
    </div>
  )
}

export default App
