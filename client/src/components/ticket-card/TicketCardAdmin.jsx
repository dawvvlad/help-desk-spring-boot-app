import './ticket-card.css';
import { useEffect, useState } from 'react';
import {Preloader} from "../preloader/Preloader.jsx";

// eslint-disable-next-line react/prop-types
export const TicketCardAdmin = ({ ticketId, userInfo }) => {
    const [ticketInfo, setTicketInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({});
    const userName = userInfo.info;

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
                setTicketInfo(data);
                setMessage(data.message || {});
                console.log(data);
            })
            .catch((err) => console.error(err))
            .finally(() => {
                setIsLoading(false);
            });
    }, [ticketId]);

    function handleTakeTicket() {
        fetch(`/api/v1/admin/takeTicket/${ticketId}`, {
            method: "PATCH",
            headers:
                {
                    "Content-type": "application/json"
                },
            body: JSON.stringify({
                executor: userName.username,
            })
        })

        setTicketInfo(prevState => ({
            ...prevState,
            status: 'ACTIVE',
            executor: userName.username// Присваиваем новое значение напрямую, без использования 'statuses'
        }));
    }


    function handleCloseTicket() {
        setTicketInfo(prevState => ({ ...prevState, status: 'CLOSED' }))
    }

    return (
        <>
            {isLoading ? (
                <Preloader/>
            ) : (
                <div className="container right-panel">
                    <div className="ticket-page">
                        <h2>Заявка #{ticketId} (Admin)</h2>
                        <div className="ticket-page__column">
                            <p className="ticket-title-p">Статус:</p>
                            <p>
                                <span className="status-circle"> </span>
                                {statuses[ticketInfo.status]}
                            </p>
                        </div>
                        <div className="ticket-page__column">
                            <p className="ticket-title-p">Отправитель:</p>
                            <p>{ticketInfo.sender}</p>
                        </div>
                        <div className="ticket-page__column">
                            <p className="ticket-title-p">Тема:</p>
                            <p>{ticketInfo.theme ? ticketInfo.theme : '---'}</p>
                        </div>
                        <div className="ticket-page__column">
                            <p className="ticket-title-p">Приоритет:</p>
                            <p>{priorities[ticketInfo.priority]}</p>
                        </div>
                        <div className="ticket-page__column">
                            <p className="ticket-title-p">Исполнитель:</p>
                            <p>{ticketInfo.executor}</p>
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
                            <p>{ticketInfo.dateTime}</p>
                        </div>

                        {ticketInfo.status === 'ACTIVE' && (
                            <button className="button closing-button" onClick={handleCloseTicket}>
                                Закрыть заявку
                            </button>
                        )}
                        {ticketInfo.status === 'OPEN' && (
                            <button className="button" onClick={handleTakeTicket}>
                                Взять в работу
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
