import './ticket-card.css';
import { useEffect, useState } from 'react';
import { Preloader } from "../preloader/Preloader.jsx";
import {CloseTicketModal} from "../modal/CloseTicketModal.jsx";// import the modal
import {statusColors, statuses, priorities} from "../../objects.js";
import {stompClient} from "../../websocket/webSocketConfig.js";

// eslint-disable-next-line react/prop-types
export const TicketCardAdmin = ({ ticketId, userInfo }) => {
    const [ticketInfo, setTicketInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false); // state to handle modal visibility
    const userName = userInfo.info;

    useEffect(() => {
        console.log(ticketInfo)

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
            executor: userName.username
        }));
    }

    function handleCloseTicket(comment) {
        const datetime = new Date().toLocaleString().toString();

        fetch(`/api/v1/admin/closeTicket/${ticketId}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                comment: comment,
                closedDateTime: new Date().toLocaleString().toString()
            })
        }).then(() => {
            setTicketInfo(prevState => ({
                ...prevState, status: 'CLOSED',
                closedDateTime: datetime,
                commentAfterClose: comment,
            }));
            setIsModalOpen(false);
        }).catch(err => console.error(err));

        stompClient.publish({
            destination: "/app/chat",
            body: JSON.stringify({
                id: "#",
                recipientUsername: ticketInfo.sender,
                executor: userName,
                theme: "",
                priority: ticketInfo.priority,
                dateTime: datetime,
            })
        })
    }

    return (
        <>
            {isLoading ? (
                <Preloader/>
            ) : (
                <div className="container right-panel">
                    <div className="ticket-page">
                        <h2>Заявка #{ticketId}</h2>
                        <div className="ticket-page__column">
                            <p className="ticket-title-p">Статус:</p>
                            <p>
                                <span className={`status-circle ${statusColors[ticketInfo.status]}`}> </span>
                                {statuses[ticketInfo.status]}
                            </p>
                        </div>
                        <div className="ticket-page__column">
                            <p className="ticket-title-p">Отправитель:</p>
                            <p>{`${ticketInfo.senderFullName} (${(ticketInfo.sender)})`}</p>
                        </div>
                        <div className="ticket-page__column">
                            <p className="ticket-title-p">Дата/Время:</p>
                            <p>{ticketInfo.dateTime}</p>
                        </div>
                        <div className="ticket-page__column">
                            <p className="ticket-title-p">Тема:</p>
                            <p>{ticketInfo.theme ? ticketInfo.theme : 'Без темы'}</p>
                        </div>
                        <div className="ticket-page__column">
                            <p className="ticket-title-p">Приоритет:</p>
                            <p>{priorities[ticketInfo.priority]}</p>
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
                            <p className="ticket-title-p">Исполнитель:</p>
                            <p>{ticketInfo.executor ? ticketInfo.executor : 'Нет исполнителя'}</p>
                        </div>

                        {ticketInfo.status === 'CLOSED' && (
                            <div className="ticket-page__column">
                                <p className="ticket-title-p">Дата/Время закрытия:</p>
                                <p>{ticketInfo.closedDateTime ? ticketInfo.closedDateTime : '-'}</p>
                            </div>
                        )}

                        {ticketInfo.status === 'CLOSED' && (
                            <div className="ticket-page__column">
                                <p className="ticket-title-p">Комментарий исполнителя:</p>
                                <p>{ticketInfo.commentAfterClose ? ticketInfo.commentAfterClose : '-'}</p>
                            </div>
                        )}


                        {ticketInfo.status === 'ACTIVE' && (
                            <button className="button closing-button" onClick={() => setIsModalOpen(true)}>
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

            <CloseTicketModal show={isModalOpen} handleClose={() => setIsModalOpen(false)}
                              handleSubmit={handleCloseTicket}/>
        </>
    );
};
