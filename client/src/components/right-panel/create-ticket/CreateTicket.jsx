import './create-ticket.css';
import {DragFileInput} from "../../form/DragFileInput.jsx";
import {TicketForm} from "../../form/TicketForm.jsx";

export const CreateTicket = () => {
    return (
        <div className={"container right-panel"}>
            <div>
                <h1>Create</h1>
            </div>
            <div className="form-container">
                <TicketForm/>
                <DragFileInput/>
            </div>
        </div>
    );
}
