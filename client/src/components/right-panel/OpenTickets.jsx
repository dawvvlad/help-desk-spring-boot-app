import {TicketTopPanel} from "../ticket/TicketTopPanel.jsx";
import {useContext, useEffect} from "react";
import {ContextProvider} from "../../context/Context.jsx";
import {Ticket} from "../ticket/Ticket.jsx";

export const OpenTickets = () => {
    const {resources, setResources} = useContext(ContextProvider)

    useEffect(function addTitle () {
        setResources(resources.filter(e => e > 4));
        console.log(resources);

    }, []);
    return (
        <>
            <div className={"container right-panel"}>
                <TicketTopPanel/>

                {resources.map((e) => {
                    return <Ticket key={e} id={e} value={e}/>
                })}
            </div>
        </>
    )
}