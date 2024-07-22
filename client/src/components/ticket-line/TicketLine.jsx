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

    // function randomInteger(min, max) {
    //     // случайное число от min до (max+1)
    //     let rand = min + Math.random() * (max + 1 - min);
    //     return Math.floor(rand);
    // }

    // const ticketInfo = {
    //     number: "#" + value.id,
    //     theme: value.themeId,
    //     status: value.status,
    //     priority: value.priority,
    // }

    // useEffect(() => {
    //     const stat = document.querySelectorAll('.status');
    //     stat.forEach(e => {
    //         if(e.textContent === 'Закрыта') {
    //             e.classList.add('grey')
    //         }
    //         if(e.textContent === 'Ожидает') {
    //             e.classList.add('yellow')
    //         }
    //         if(e.textContent === 'В работе') {
    //             e.classList.add('green')
    //         }
    //     })
    //
    //     console.log(stat)
    // }, []);

    // useEffect(() => {
    //     const prior = document.querySelectorAll('.priority')
    //     prior.forEach(e => {
    //         if(e.textContent === 'Низкий') {
    //             e.classList.add('green')
    //         }
    //         if(e.textContent === 'Высокий') {
    //             e.classList.add('red')
    //         }
    //         if(e.textContent === 'Средний') {
    //             e.classList.add('yellow')
    //         }
    //     })
    //
    // }, [])

    return (
        <Link className={"tickets-wrapper"} to={`/ticket/${id}`}>
                <p className={"text ticket-p"}>{"#" + id}</p>
                <p className={"text ticket-p"}>{value.theme ? value.theme : 'Нет темы'}</p>
                <p className={"text ticket-p status"}>{statuses[value.status]}</p>
                <p className={"text ticket-p"}>{value.executor ? value.executor : 'Нет исполнителя'}</p>
                <p className={"text ticket-p priority"}>{priorities[value.priority]}</p>
                <p className={"text ticket-p"}>{value.dateTime}</p>
        </Link>

    )
}