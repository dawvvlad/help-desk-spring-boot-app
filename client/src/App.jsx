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
import {TicketPage} from "./view/ticket-page/TicketPage.jsx";
import {Settings} from "./view/admin/settings/Settings.jsx";
import {PageNotFound} from "./view/page-not-found/PageNotFound.jsx";
import {BannerSettings} from "./view/admin/settings/banners/BannerSettings.jsx";
import {ThemesSettings} from "./view/admin/settings/themes/ThemesSettings.jsx";
import {UploadOrderSettings} from "./view/admin/settings/upload-order/UploadOrderSettings.jsx";

function App() {
    let user = 0;

    return (
        <>
            <Context>
                <Router>
                    <Routes>
                        <Route path="/" element={<Layout/>}>
                            <Route path={"*"} element={<PageNotFound/>}/>
                            {user === 1 ?
                                <Route path={"/"} element={<UserMain/>}>
                                    <Route index element={<Navigate to="tickets/wait" />} />
                                    <Route path="tickets" element={<Navigate to="/tickets/wait" />} />
                                    <Route path="tickets/all" element={<AllTickets/>} />
                                    <Route path="tickets/wait" element={<WaitTickets/>} />
                                    <Route path="tickets/open" element={<OpenTickets/>} />
                                    <Route path="tickets/closed" element={<ClosedTickets />} />
                                    <Route path="tickets/create" element={<CreateTicket />} />
                                    <Route path="ticket/:id" element={<TicketPage />} />
                                </Route> :
                                <Route path={"/"} element={<AdminMain/>}>
                                    <Route index element={<Navigate to="tickets/new" />} />
                                    <Route path="tickets" element={<Navigate to="/tickets/new" />} />
                                    <Route path="tickets/all" element={<AllTickets/>} />
                                    <Route path="tickets/new" element={<WaitTickets/>} />
                                    <Route path="tickets/open" element={<OpenTickets/>} />
                                    <Route path="tickets/closed" element={<ClosedTickets />} />
                                    <Route path="ticket/:id" element={<TicketPage />} />
                                    <Route path="settings" element={<Settings />} />
                                    <Route path="settings/themes" element={<ThemesSettings />} />
                                    <Route path="settings/banners" element={<BannerSettings />} />
                                    <Route path="settings/upload-order" element={<UploadOrderSettings />} />
                                </Route>
                            }
                        </Route>
                    </Routes>
                </Router>
            </Context>
        </>
    )
}

export default App;
