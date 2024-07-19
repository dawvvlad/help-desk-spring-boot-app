import './ticket-form.css'
import PrioritySelector from "./priority-selector/PrioritySelector.jsx";

export const TicketForm = () => {
    return (
        <>
            <form className={"form"}>
                <textarea name="text" placeholder="Текст сообщения" className={"message-text"}/>
                <PrioritySelector/>
            </form>
        </>
    )
}