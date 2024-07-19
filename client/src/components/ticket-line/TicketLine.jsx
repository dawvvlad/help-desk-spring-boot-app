import './ticket-line.css'
import {Link} from "react-router-dom";
import {useEffect} from "react";

export const TicketLine = (props) => {
    const {value} = props;
    const statuses = ['В работе', 'Закрыта', 'Ожидает']
    const priorities = ['Низкий', 'Средний', 'Высокий']

    function randomInteger(min, max) {
        // случайное число от min до (max+1)
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    const ticketInfo = {
        number: value,
        theme: 'Сломался принтер',
        status: statuses[randomInteger(0, 2)],
        priority: priorities[randomInteger(0, 2)],
    }

    useEffect(() => {
        const stat = document.querySelectorAll('.status');
        stat.forEach(e => {
            if(e.textContent === 'Закрыта') {
                e.classList.add('grey')
            }
            if(e.textContent === 'Ожидает') {
                e.classList.add('yellow')
            }
            if(e.textContent === 'В работе') {
                e.classList.add('green')
            }
        })

        console.log(stat)
    }, []);

    useEffect(() => {
        const prior = document.querySelectorAll('.priority')
        prior.forEach(e => {
            if(e.textContent === 'Низкий') {
                e.classList.add('green')
            }
            if(e.textContent === 'Высокий') {
                e.classList.add('red')
            }
            if(e.textContent === 'Средний') {
                e.classList.add('yellow')
            }
        })

    }, [])

    return (
        <Link className={"tickets-wrapper"} to={`/ticket/${value}`}>
                <p className={"text ticket-p"}>{"#" + value}</p>
                <p className={"text ticket-p"}>{ticketInfo.theme}</p>
                <p className={"text ticket-p status"}>{ticketInfo.status}</p>
                <p className={"text ticket-p"}>Голиков В.</p>
                <p className={"text ticket-p priority"}>{ticketInfo.priority}</p>
                <p className={"text ticket-p"}>18.07.2024 13:28</p>
        </Link>

    )
}