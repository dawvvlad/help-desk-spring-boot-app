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
import { useEffect, useState } from "react";
import {stompClient, disconnect, connect} from "./websocket/webSocketConfig.js";

function App() {
    const [userInfo, setUserInfo] = useState({});
    const [isAdmin, setIsAdmin] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch("/api/v1/userInfo")
            .then(response => response.json())
            .then(data => {
                setUserInfo(data);
                const adminStatus = data.info.authorities.some(auth => auth.authority === 'Администраторы');
                setIsAdmin(adminStatus);
            })
            .catch(err => console.error(err))
            .finally(() => {
                setLoading(false);
            });

        connect();
        if(stompClient.connected && isAdmin) {
            stompClient.subscribe('/topic/admin', (message) => {
                console.log("subscribed");
            });
        }
    }, []);

    useEffect(() => {
        console.log("User Info:", userInfo);
        console.log("Is Admin:", isAdmin);
    }, [userInfo, isAdmin]);

    return (
        <>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <Context>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Layout user={userInfo} admin={isAdmin} />}>
                                <Route path={"*"} element={<PageNotFound />} />
                                {isAdmin ? (
                                    <Route path="/" element={<AdminMain user={userInfo} admin={isAdmin} />}>
                                        <Route index element={<Navigate to="tickets/open" />} />
                                        <Route path="tickets" element={<Navigate to="/tickets/open" />} />
                                        <Route path="tickets/all" element={<AllTickets isAdmin={isAdmin} />} />
                                        <Route path="tickets/:status" element={<ParamTickets isAdmin={isAdmin} />} />
                                        <Route path="ticket/:id" element={<TicketPage isAdmin={isAdmin} userInfo={userInfo} />} />
                                        <Route path="settings" element={<Settings />} />
                                        <Route path="settings/themes" element={<ThemesSettings />} />
                                        <Route path="settings/banners" element={<BannerSettings />} />
                                        <Route path="settings/upload-order" element={<UploadOrderSettings />} />
                                    </Route>
                                ) : (
                                    <Route path="/" element={<UserMain user={userInfo} admin={isAdmin} />}>
                                        <Route index element={<Navigate to="tickets/open" />} />
                                        <Route path="tickets" element={<Navigate to="/tickets/open" />} />
                                        <Route path="tickets/all" element={<AllTickets user={userInfo} isAdmin={isAdmin} />} />
                                        <Route path="tickets/:status" element={<ParamTickets user={userInfo} isAdmin={isAdmin} />} />
                                        <Route path="tickets/create" element={<CreateTicket user={userInfo ? userInfo : {}} />} />
                                        <Route path="ticket/:id" element={<TicketPage isAdmin={isAdmin} />} />
                                    </Route>
                                )}
                            </Route>
                        </Routes>
                    </Router>
                </Context>
            )}
        </>
    );
}

export default App;
