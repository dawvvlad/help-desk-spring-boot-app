import './ticket-form.css'

export const TicketForm = () => {
    return (
        <>
            <form className={"form"}>
                <textarea name="text" placeholder="Текст сообщения" className={"message-text"}/>
            </form>
        </>
    )
}