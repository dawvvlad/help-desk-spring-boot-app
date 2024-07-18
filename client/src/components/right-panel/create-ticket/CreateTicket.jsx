import './create-ticket.css';
import {DragFileInput} from "../../form/DragFileInput.jsx";
import {TicketForm} from "../../form/TicketForm.jsx";

export const CreateTicket = () => {
    return (
        <div className={"container right-panel"}>
            <div className="form-container">
                <TicketForm/>
                <DragFileInput/>
                <button className={"button"}>Отправить заявку</button>
            </div>

        </div>
    );
}
