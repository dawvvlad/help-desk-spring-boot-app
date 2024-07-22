import './main.css'
import {LeftPanelUser} from "../../../components/left-panel/LeftPanelUser.jsx";
import {Outlet} from "react-router-dom";
import {useEffect} from "react";

export const UserMain = ({user, admin}) => {

    useEffect(() => {
        document.title = "HelpDesk"
    }, []);

    return (
        <>
            <div className="container main">
                <LeftPanelUser/>
                <Outlet/>
            </div>
        </>
    )
}