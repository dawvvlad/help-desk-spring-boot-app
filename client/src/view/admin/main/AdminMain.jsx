import {useContext, useEffect} from "react";
import {Outlet} from "react-router-dom";
import {LeftPanelAdmin} from "../../../components/left-panel/LeftPanelAdmin.jsx";
import {ContextProvider} from "../../../context/Context.jsx";

export const AdminMain = ({user, admin}) => {

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