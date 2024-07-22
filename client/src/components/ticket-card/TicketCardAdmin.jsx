import './ticket-card.css';
import { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
export const TicketCardAdmin = ({ ticketId }) => {
    const [ticketInfo, setTicketInfo] = useState({});
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
                setTicketInfo(data);
                setMessage(data.message);
                console.log(data);
            })
            .catch((err) => console.error(err))
            .finally(() => {
                setIsLoading(false);
            });
    }, [ticketId]);

    function handleTakeTicket() {
        fetch(`/api/v1/admin/changeTicketStatus/${ticketId}`, {
            method: "PATCH",
            headers:
                {
                    "Content-type": "application/json"
                },
            body: JSON.stringify({
                executor: "",
                status: "ACTIVE"
            })
        })

        setTicketInfo(prevState => ({
            ...prevState,
            status: 'ACTIVE'  // Присваиваем новое значение напрямую, без использования 'statuses'
        }));
    }

    function handleCloseTicket() {
        setTicketInfo(prevState => ({ ...prevState, status: 'CLOSED' }))
    }

    return (
        <>
            {isLoading ? (
                <h1>Loading...</h1>
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
                            <p>{ticketInfo.theme}</p>
                        </div>
                        <div className="ticket-page__column">
                            <p className="ticket-title-p">Приоритет:</p>
                            <p>{priorities[ticketInfo.priority]}</p>
                        </div>
                        <div className="ticket-page__column">
                            <p className="ticket-title-p">Комментарий:</p>
                            <p>{message.text}</p>
                        </div>
                        <div className="ticket-page__column">
                            <p className="ticket-title-p">Файлы:</p>
                            <p>F1</p>
                        </div>
                        <div className="ticket-page__column">
                            <p className="ticket-title-p">Дата/Время:</p>
                            <p>24.12.2023 18:00</p>
                        </div>

                        {ticketInfo.status === 'ACTIVE' && (
                            <button className="button closing-button" onClick={}>
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
