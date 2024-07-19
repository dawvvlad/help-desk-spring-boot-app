import {useContext, useEffect} from "react";
import {TicketLine} from "../ticket-line/TicketLine.jsx";
import {ContextProvider} from "../../context/Context.jsx";
import {TicketTopPanel} from "../ticket-line/TicketTopPanel.jsx";
import './tickets-panel.css'

export const AllTickets = () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    return (
        <>
            <div className={"container right-panel"}>
                <TicketTopPanel/>
                <div className={"tickets-container"}>
                    {arr.map((e) => {
                        return <TicketLine key={e} id={e} value={e}/>
                    })}

                </div>


            </div>
        </>

    )
}