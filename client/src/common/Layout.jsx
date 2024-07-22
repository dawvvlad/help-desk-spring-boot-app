import {Header} from "../components/header/Header.jsx";
import {Outlet} from "react-router-dom";

export const Layout = ({user}) => {
    return (
        <>
            <Header user={user}/>
            <Outlet/>
        </>
    )
}