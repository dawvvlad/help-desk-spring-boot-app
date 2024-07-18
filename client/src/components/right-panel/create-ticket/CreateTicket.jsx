import './create-ticket.css'
import {useEffect} from "react";

export const CreateTicket = () => {

    useEffect(function addTitle () {
        document.title = "HelpDesk - Создать зявку"
    }, []);

    return (
        <div className={"container right-panel"}>
            <h1>
                Create
            </h1>
        </div>

    )
}