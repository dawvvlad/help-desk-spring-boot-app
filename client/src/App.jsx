import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {UserMain} from "./view/user/main/UserMain.jsx";
import {AdminMain} from "./view/admin/main/AdminMain.jsx"
import {Layout} from "./common/Layout.jsx";
import {Context} from "./context/Context.jsx";
import {AllTickets} from "./components/right-panel/AllTickets.jsx";
import {OpenTickets} from "./components/right-panel/OpenTickets.jsx";
import {ClosedTickets} from "./components/right-panel/ClosedTickets.jsx";
import {CreateTicket} from "./components/right-panel/create-ticket/CreateTicket.jsx";
import {WaitTickets} from "./components/right-panel/WaitTickets.jsx";

function App() {
    let user = 1;

  return (
      <Context>
          <Router>
              <Routes>
                  <Route path="/" element={<Layout/>}>
                  {user === 1 ?
                      <Route path={"/"} element={<UserMain/>}>
                          <Route index element={<Navigate to="tickets/all" />} />
                          <Route path="tickets/all" element={<AllTickets/>} />
                          <Route path="tickets/wait" element={<WaitTickets/>} />
                          <Route path="tickets/open" element={<OpenTickets/>} />
                          <Route path="tickets/closed" element={<ClosedTickets />} />
                          <Route path="tickets/create" element={<CreateTicket />} />
                      </Route>:
                      <Route path={"/"} element={<AdminMain/>}>
                          <Route path="openTickets/*" element={<UserMain />} />
                      </Route>}
                  </Route>
              </Routes>
          </Router>
      </Context>
  )
}

export default App
