import {useEffect} from "react";
import {Ticket} from "../ticket/Ticket.jsx";

export const AllTickets = () => {

    useEffect(function addTitle () {
        document.title = "HelpDesk - Все зявки"
    }, []);

    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return (
        <>
            <div className={"container right-panel"}>
                <div className={"tickets-panel"}>
                    <p className={"text ticket-p"}>Номер</p>
                    <p className={"text ticket-p"}>Тема</p>
                    <p className={"text ticket-p"}>Статус</p>
                    <p className={"text ticket-p"}>Исполнитель</p>
                    <p className={"text ticket-p"}>Приоритет</p>
                    <p className={"text ticket-p"}>Дата/Время</p>
                </div>

                {arr.map((e) => {
                    return <Ticket key={e} id={e} value={e}/>
                })}

            </div>
        </>

    )
}