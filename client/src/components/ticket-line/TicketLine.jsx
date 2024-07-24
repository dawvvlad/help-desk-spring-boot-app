import './ticket-line.css'
import {Link} from "react-router-dom";
import {statusColors, priorityColors, statuses, priorities} from "../../objects.js";

export const TicketLine = ({id, value}) => {
    return (
        <Link className={"tickets-wrapper"} to={`/ticket/${id}`}>
                <p className={"text ticket-p"}>{"#" + id}</p>
                <p className={"text ticket-p"}>{value.theme ? value.theme : 'Нет темы'}</p>
                <p className={`text ticket-p status ${statusColors[value.status]}`}>{statuses[value.status]}</p>
                <p className={"text ticket-p"}>{value.executor ? value.executor : 'Нет исполнителя'}</p>
                <p className={`text ticket-p priority ${priorityColors[value.priority]}`}>{priorities[value.priority]}</p>
                <p className={"text ticket-p"}>{value.dateTime}</p>
        </Link>

    )
}