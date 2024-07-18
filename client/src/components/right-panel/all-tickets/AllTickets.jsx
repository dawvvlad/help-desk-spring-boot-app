import './all-tickets.css'
import {useEffect} from "react";

export const AllTickets = () => {

    useEffect(function addTitle () {
        document.title = "HelpDesk - Все зявки"
    }, []);

    return (
        <div className={"container right-panel"}>
            <h1>All</h1>
        </div>
    )
}