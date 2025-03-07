import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import MovieHome from "./Components/MovieHome"
import FavoritesMovie from "./Components/FavouriteMovie"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MovieHome/>}/>
          <Route path="/favourite" element={<FavoritesMovie/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
