import './main.css'
import {LeftPanelUser} from "../../../components/left-panel/user/LeftPanelUser.jsx";
import {Outlet} from "react-router-dom";


export const UserMain = () => {

    return (
        <>
            <div className="container main">
                <LeftPanelUser/>
                <Outlet/>
            </div>
        </>
    )
}