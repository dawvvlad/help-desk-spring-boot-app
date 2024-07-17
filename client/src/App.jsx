import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {UserMain} from "./view/user/main/UserMain.jsx";
import {AdminMain} from "./view/admin/main/AdminMain.jsx"
import {Layout} from "./common/Layout.jsx";
import {Context} from "./context/Context.jsx";

function App() {
    let user = 1;
  return (
      <Context>
          <Router>
              <Routes>
                  <Route path="/" element={<Layout/>}>
                  {user === 1 ?
                      <Route index element={<UserMain/>}/> :
                      <Route index element={<AdminMain/>}/>}
                  </Route>
              </Routes>
          </Router>
      </Context>
  )
}

export default App
