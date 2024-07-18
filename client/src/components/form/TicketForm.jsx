import './ticket-form.css'

export const TicketForm = () => {
    return (
        <>
            <form className={"form"}>
                <select name={"select"} className={"select"}>
                    <option name={"option"}>
                        1
                    </option>
                    <option name={"option"}>
                        2
                    </option>
                    <option name={"option"}>
                        3
                    </option>
                    <option name={"option"}>
                        4
                    </option>
                </select>
                <textarea name="text" placeholder="Текст сообщения" className={"message-text"}/>
            </form>
        </>
    )
}