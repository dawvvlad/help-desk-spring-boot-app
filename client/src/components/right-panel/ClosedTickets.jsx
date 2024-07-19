import {useContext, useEffect} from "react";
import {ContextProvider} from "../../context/Context.jsx";

export const ClosedTickets = () => {

    const {resources} = useContext(ContextProvider)

    useEffect(() => {
        console.log("Ress from closed tickets: ", resources)
    }, []);

    return (
        <div className={"container right-panel"}>
            <h1>Closed</h1>

        </div>
    )
}