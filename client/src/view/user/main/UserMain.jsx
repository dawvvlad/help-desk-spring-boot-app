import {Ticket} from "../../../components/ticket/Ticket.jsx";
import './main.css'
import {LeftPanel} from "../../../components/left-panel/LeftPanel.jsx";
import {RightPanel} from "../../../components/right-panel/RightPanel.jsx";

export const UserMain = () => {

    return (
        <>
            <div className="container">
                <LeftPanel/>
                <RightPanel/>
            </div>
        </>
    )
}