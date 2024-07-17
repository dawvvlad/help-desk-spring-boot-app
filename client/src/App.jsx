import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {UserMain} from "./view/user/main/UserMain.jsx";
import {AdminMain} from "./view/admin/main/AdminMain.jsx"

function App() {
    let user = 1;
  return (
      <>
          <Router>
              <Routes>
                  {user === 1 ?
                      <Route index element={<UserMain/>}/> :
                      <Route index element={<AdminMain/>}/>}
              </Routes>
          </Router>
      </>
  )
}

export default App
