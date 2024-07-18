import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {UserMain} from "./view/user/main/UserMain.jsx";
import {AdminMain} from "./view/admin/main/AdminMain.jsx"
import {Layout} from "./common/Layout.jsx";
import {Context} from "./context/Context.jsx";
import {AllTickets} from "./components/right-panel/all-tickets/AllTickets.jsx";
import {OpenTickets} from "./components/right-panel/open-tickets/OpenTickets.jsx";
import {ClosedTickets} from "./components/right-panel/closed-tickets/ClosedTickets.jsx";
import {CreateTicketModal} from "./components/create-ticket-modal/CreateTicketModal.jsx";

function App() {
    let user = 1;
  return (
      <Context>
          <Router>
              <Routes>
                  <Route path="/" element={<Layout/>}>
                  {user === 1 ?
                      <Route path={"/"} element={<UserMain/>}>
                          <Route path="allTickets" element={<AllTickets/>} />
                          <Route path="openTickets" element={<OpenTickets/>} />
                          <Route path="closedTickets" element={<ClosedTickets />} />
                          <Route path="createTicket" element={<CreateTicketModal />} />
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
