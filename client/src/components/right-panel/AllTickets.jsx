import {TicketLine} from "../ticket-line/TicketLine.jsx";
import {TicketTopPanel} from "../ticket-line/TicketTopPanel.jsx";
import './tickets-panel.css'
import {useContext, useEffect, useState} from "react";
import {ContextProvider} from "../../context/Context.jsx";

export const AllTickets = () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    const {resources, setResources} = useContext(ContextProvider);

    useEffect(() => {
        setResources(arr)
    }, [])

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