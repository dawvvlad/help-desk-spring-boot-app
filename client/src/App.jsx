import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {UserMain} from "./view/user/main/UserMain.jsx";
import {AdminMain} from "./view/admin/main/AdminMain.jsx"
import {Layout} from "./common/Layout.jsx";
import {Context} from "./context/Context.jsx";
import {AllTickets} from "./components/right-panel/all-tickets/AllTickets.jsx";
import {OpenTickets} from "./components/right-panel/open-tickets/OpenTickets.jsx";
import {ClosedTickets} from "./components/right-panel/closed-tickets/ClosedTickets.jsx";
import {CreateTicket} from "./components/right-panel/create-ticket/CreateTicket.jsx";
import {WaitTickets} from "./components/right-panel/wait_tickets/WaitTickets.jsx";

function App() {
    let user = 1;

  return (
      <Context>
          <Router>
              <Routes>
                  <Route path="/" element={<Layout/>}>
                  {user === 1 ?
                      <Route path={"/"} element={<UserMain/>}>
                          <Route index element={<Navigate to="all_tickets" />} />
                          <Route path="all_tickets" element={<AllTickets/>} />
                          <Route path="wait_tickets" element={<WaitTickets/>} />
                          <Route path="open_tickets" element={<OpenTickets/>} />
                          <Route path="closed_tickets" element={<ClosedTickets />} />
                          <Route path="create_ticket" element={<CreateTicket />} />
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
