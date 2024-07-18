import './ticket.css'
import {Link} from "react-router-dom";

export const Ticket = (props) => {
    const {value} = props;

    return (
        <Link className={"tickets-wrapper"} to={`/tickets/${value}`}>
                <p className={"text ticket-p"}>{"#" + value}</p>
                <p className={"text ticket-p"}>Сломался принтер</p>
                <p className={"text ticket-p status"}>В работе</p>
                <p className={"text ticket-p"}>Голиков В.</p>
                <p className={"text ticket-p priority"}>Низкий</p>
                <p className={"text ticket-p"}>18.07.2024 13:28</p>
        </Link>

    )
}