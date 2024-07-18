import {useContext, useEffect} from "react";
import {Ticket} from "../ticket/Ticket.jsx";
import {ContextProvider} from "../../context/Context.jsx";
import {TicketTopPanel} from "../ticket/TicketTopPanel.jsx";

export const AllTickets = () => {

    const {resources, setResources} = useContext(ContextProvider)
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    useEffect(function addTitle () {
        setResources(arr);
        console.log(arr);
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