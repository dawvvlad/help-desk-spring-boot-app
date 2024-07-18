import {useEffect} from "react";

export const OpenTickets = () => {

    useEffect(function addTitle () {
        document.title = "HelpDesk - Открытые зявки"
    }, []);

    return (
        <div className={"container right-panel"}>
            <h1>Open</h1>

        </div>
    )
}