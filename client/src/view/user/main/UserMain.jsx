import './main.css'
import {LeftPanelUser} from "../../../components/left-panel/LeftPanelUser.jsx";
import {Outlet} from "react-router-dom";

export const UserMain = ({user, admin}) => {
    return (
        <>
            <div className="container main">
                <LeftPanelUser/>
                <Outlet/>
            </div>
        </>
    )
}