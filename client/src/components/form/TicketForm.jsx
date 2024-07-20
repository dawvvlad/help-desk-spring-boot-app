import './ticket-form.css'
import PrioritySelector from "./priority-selector/PrioritySelector.jsx";

export const TicketForm = ({ticket, setTicket}) => {

    function handleChange (e) {
        e.preventDefault()
        const {name, value} = e.target

        setTicket({
            ...ticket,
            text: value
        })
    }

    return (
        <>
            <form className={"form"}>
                <textarea onChange={handleChange} name="text" placeholder="Комментарий к заявке" className={"message-text"}/>
                <PrioritySelector ticket = {ticket} setTicket={setTicket}/>
            </form>
        </>
    )
}