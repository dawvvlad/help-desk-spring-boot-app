import './ticket-line.css'
import {Link} from "react-router-dom";
import {useEffect} from "react";

export const TicketLine = ({id, value}) => {
    const statuses = {
        OPEN: 'Ожидает',
        ACTIVE: 'В работе',
        CLOSED: 'Закрыта',
        NEW: 'Новая'
    }
    const priorities = {
        LOW: 'Низкий',
        MEDIUM: 'Средний',
        HIGH: 'Высокий'
    }

    const statusColors = {
        OPEN: 'yellow',
        ACTIVE: 'green',
        CLOSED: 'grey',
    }

    const priorityColors = {
        LOW: 'green',
        MEDIUM: 'yellow',
        HIGH: 'red'
    }

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