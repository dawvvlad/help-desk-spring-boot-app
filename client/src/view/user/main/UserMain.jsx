import './main.css'
import {LeftPanel} from "../../../components/left-panel/LeftPanel.jsx";
import {Outlet} from "react-router-dom";


export const UserMain = () => {

    return (
        <>
            <div className="container main">
                <LeftPanel/>
                <Outlet/>
            </div>
        </>
    )
}