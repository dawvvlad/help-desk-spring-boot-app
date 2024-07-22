import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { UserMain } from "./view/user/main/UserMain.jsx";
import { AdminMain } from "./view/admin/main/AdminMain.jsx";
import { Layout } from "./common/Layout.jsx";
import { Context } from "./context/Context.jsx";
import { AllTickets } from "./components/right-panel/AllTickets.jsx";
import { ParamTickets } from "./components/right-panel/ParamTickets.jsx";
import { CreateTicket } from "./components/right-panel/create-ticket/CreateTicket.jsx";
import { TicketPage } from "./view/ticket-page/TicketPage.jsx";
import { Settings } from "./view/admin/settings/Settings.jsx";
import { PageNotFound } from "./view/page-not-found/PageNotFound.jsx";
import { BannerSettings } from "./view/admin/settings/banners/BannerSettings.jsx";
import { ThemesSettings } from "./view/admin/settings/themes/ThemesSettings.jsx";
import { UploadOrderSettings } from "./view/admin/settings/upload-order/UploadOrderSettings.jsx";
import {useEffect, useState} from "react";

function App() {
    const [userInfo, setUserInfo] = useState({});
    // const [isAdmin, setIsAdmin] = useState(null)

    const isAdmin = false

    useEffect(() => {
        fetch("/api/v1/userInfo")
            .then(data => data.json())
            .then(data => {
                setUserInfo(data)
                // setIsAdmin(data.info.authorities.some(auth => auth.authority === 'Администраторы'));

                console.log(data)
            })
            .catch(err => console.error(err));

    }, []);

    return (
        <Context>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout user={userInfo}/>}>
                        <Route path={"*"} element={<PageNotFound />} />
                        {isAdmin ?
                            <Route path="/" element={<AdminMain user={userInfo} admin={isAdmin} />}>
                                <Route index element={<Navigate to="tickets/open" />} />
                                <Route path="tickets" element={<Navigate to="/tickets/open" />} />
                                <Route path="tickets/all" element={<AllTickets />} />
                                <Route path="tickets/:status" element={<ParamTickets />} />
                                <Route path="ticket/:id" element={<TicketPage />} />
                                <Route path="settings" element={<Settings />} />
                                <Route path="settings/themes" element={<ThemesSettings />} />
                                <Route path="settings/banners" element={<BannerSettings />} />
                                <Route path="settings/upload-order" element={<UploadOrderSettings />} />
                            </Route> :
                            <Route path="/" element={<UserMain user={userInfo} admin={isAdmin}/>}>
                                <Route index element={<Navigate to="tickets/open" />} />
                                <Route path="tickets" element={<Navigate to="/tickets/open" />} />
                                <Route path="tickets/all" element={<AllTickets />} />
                                <Route path="tickets/:status" element={<ParamTickets />} />
                                <Route path="tickets/create" element={<CreateTicket user={userInfo}/>} />
                                <Route path="ticket/:id" element={<TicketPage />} />
                            </Route>
                        }
                    </Route>
                </Routes>
            </Router>
        </Context>
    );
}

export default App;
