import {useEffect} from "react";
import {Outlet} from "react-router-dom";
import {LeftPanelAdmin} from "../../../components/left-panel/LeftPanelAdmin.jsx";

export const AdminMain = () => {

    

    useEffect(() => {
        document.title = "HelpDesk"
    }, []);

    return (
        <>
            <div className="container main">
                <LeftPanelAdmin/>
                <Outlet/>
            </div>
        </>
    )
}