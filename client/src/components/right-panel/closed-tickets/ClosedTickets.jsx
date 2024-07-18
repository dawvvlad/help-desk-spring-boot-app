import {useEffect} from "react";

export const ClosedTickets = () => {
    useEffect(function addTitle () {
        document.title = "HelpDesk - Закрытые зявки"
    }, []);

    return (
        <div className={"container right-panel"}>
            <h1>Closed</h1>

        </div>
    )
}