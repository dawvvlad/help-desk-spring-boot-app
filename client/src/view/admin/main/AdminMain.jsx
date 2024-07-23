import {Outlet} from "react-router-dom";
import {LeftPanelAdmin} from "../../../components/left-panel/LeftPanelAdmin.jsx";

export const AdminMain = ({user, admin}) => {

    return (
        <>
            <div className="container main">
                <LeftPanelAdmin/>
                <Outlet/>
            </div>
        </>
    )
}