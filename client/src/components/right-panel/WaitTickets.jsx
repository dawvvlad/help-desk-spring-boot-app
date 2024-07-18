import {useEffect} from "react";

export const WaitTickets = () => {

    useEffect(function addTitle () {
        document.title = "HelpDesk - Неактивные зявки"
    }, []);

    return (
        <div className={"container right-panel"}>
            <h1>Wait</h1>

        </div>
    )
}
