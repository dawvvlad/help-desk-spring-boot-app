import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Test from "./view/Test.jsx";

function App() {
  return (
      <>
          <Router>
              <Routes>
                  <Route path={"/"} element={<Test/>}/>
                  <Route path={"/home"} element={<Test/>}/>
              </Routes>
          </Router>
      </>
  )
}

export default App
