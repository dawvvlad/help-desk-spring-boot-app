import {TicketTopPanel} from "../ticket-line/TicketTopPanel.jsx";
import {useContext, useEffect} from "react";
import {ContextProvider} from "../../context/Context.jsx";
import {TicketLine} from "../ticket-line/TicketLine.jsx";

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
                    return <TicketLine key={e} id={e} value={e}/>
                })}
            </div>
        </>
    )
}