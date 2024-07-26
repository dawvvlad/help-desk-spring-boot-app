import './ticket-card.css'
import { useEffect, useState } from "react";
import {Preloader} from "../preloader/Preloader.jsx";
import {statusColors, statuses, priorities} from "../../objects.js";

export const TicketCardUser = ({ ticketId }) => {
    const [ticketData, setTicketData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({});
    const fileMessage = ticketData.message;
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
                            Заявка #{ticketId}
                        </h2>

                        <div className="ticket-page__column">
                            <p className="ticket-title-p">Статус:</p>
                            <p>
                                <span className={`status-circle ${statusColors[ticketData.status]}`}> </span>
                                {statuses[ticketData.status]}
                            </p>
                        </div>
                        <div className="ticket-page__column">
                            <p className="ticket-title-p">Дата/Время:</p>
                            <p>{ticketData.dateTime}</p>
                        </div>
                        <div className="ticket-page__column">
                            <p className="ticket-title-p">Тема:</p>
                            <p>{ticketData.theme ? ticketData.theme : 'Без темы'}</p>
                        </div>
                        <div className="ticket-page__column">
                            <p className="ticket-title-p">Приоритет:</p>
                            <p>{priorities[ticketData.priority]}</p>
                        </div>
                        <div className="ticket-page__column">
                            <p className="ticket-title-p">Комментарий:</p>
                            <p>{message.text ? message.text : '---'}</p>
                        </div>
                        <div className="ticket-page__column links">
                            <p className="ticket-title-p">Файлы:</p>
                            <div className={"file-links"}>
                                {fileMessage?.fileUrlList?.length > 0 ? (
                                    fileMessage.fileUrlList.map((e, index) => {
                                        return <a key={index} href={`/${e}`}>📄</a>;
                                        // return <FileLink key={index} fileUrl={e}/>
                                    })
                                ) : (
                                    <p>Нет файлов</p>
                                )}
                            </div>
                        </div>


                        <div className="ticket-page__column">
                            <p className="ticket-title-p">Исполнитель:</p>
                            <p>{ticketData.executor ? ticketData.executor : 'Нет исполнителя'}</p>
                        </div>

                        {ticketData.status === 'CLOSED' && (
                            <div className="ticket-page__column">
                                <p className="ticket-title-p">Дата/Время закрытия:</p>
                                <p>{ticketData.closedDateTime ? ticketData.closedDateTime : '-'}</p>
                            </div>
                        )}

                        {ticketData.status === 'CLOSED' && (
                            <div className="ticket-page__column">
                                <p className="ticket-title-p">Комментарий исполнителя:</p>
                                <p>{ticketData.commentAfterClose ? ticketData.commentAfterClose : '-'}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
