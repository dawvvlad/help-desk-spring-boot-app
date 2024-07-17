import {Header} from "../components/header/Header.jsx";
import {Outlet} from "react-router-dom";

export const Layout = () => {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    )
}