import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {UserMain} from "./view/admin/main/UserMain.jsx";
import {AdminMain} from "./view/user/main/AdminMain.jsx"

function App() {
    let user = 0;
  return (
      <>
          <Router>
              <Routes>
                  {user === 1 ?
                      <Route path={"/"} element={<UserMain/>}/> :
                      <Route path={"/"} element={<AdminMain/>}/>}
              </Routes>
          </Router>
      </>
  )
}

export default App
