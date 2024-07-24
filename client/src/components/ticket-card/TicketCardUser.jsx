import './ticket-card.css'
import { useEffect, useState } from "react";
import {Preloader} from "../preloader/Preloader.jsx";

export const TicketCardUser = ({ ticketId }) => {

    const [ticketData, setTicketData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({});

    const statuses = {
        OPEN: 'Ожидает',
        ACTIVE: 'В работе',
        CLOSED: 'Закрыта',
    };

    const priorities = {
        LOW: 'Низкий',
        MEDIUM: 'Средний',
        HIGH: 'Высокий',
    };

    useEffect(() => {
        setIsLoading(true);
        fetch(`/api/v1/ticket/${ticketId}`)
            .then((data) => data.json())
            .then((data) => {
                setTicketData(data);
                setMessage(data.message || {});
                console.log(data);
            })
            .catch((err) => console.error(err))
            .finally(() => {
                setIsLoading(false);
            });
    }, [ticketId]);

    return (
        <>
            {isLoading ? (
                <Preloader/>
            ) : (
                <div className="container right-panel">
                    <div className="ticket-page">
                        <h2>
                            Заявка #{ticketId} (User)
                        </h2>

                        <div className="ticket-page__column">
                            <p className="ticket-title-p">Статус:</p>
                            <p><span className="status-circle"> </span>{statuses[ticketData.status]}</p>
                        </div>

                        <div className="ticket-page__column">
                            <p className="ticket-title-p">Тема:</p>
                            <p>{ticketData.theme ? ticketData.theme : '---'}</p>
                        </div>
                        <div className="ticket-page__column">
                            <p className="ticket-title-p">Приоритет:</p>
                            <p>{priorities[ticketData.priority]}</p>
                        </div>

                        <div className="ticket-page__column">
                            <p className="ticket-title-p">Исполнитель:</p>
                            <p>{ticketData.executor ? ticketData.executor : 'Нет исполнителя'}</p>
                        </div>

                        <div className="ticket-page__column">
                            <p className="ticket-title-p">Комментарий:</p>
                            <p>{message.text ? message.text : '---'}</p>
                        </div>
                        <div className="ticket-page__column">
                            <p className="ticket-title-p">Файлы:</p>
                            <p>F1</p>
                        </div>
                        <div className="ticket-page__column">
                            <p className="ticket-title-p">Дата/Время:</p>
                            <p>{ticketData.dateTime}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
