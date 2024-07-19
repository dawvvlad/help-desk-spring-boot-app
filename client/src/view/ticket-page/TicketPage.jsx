import './ticket-page.css'
import {useParams} from "react-router-dom";

export const TicketPage = () => {
    const {id} = useParams();

    return (
        <div className={"container right-panel"}>
            <div className={"ticket-page"}>
                <h2>
                    Ticket Page #{id}
                </h2>

                <div className={"ticket-page__column"}>
                    <p className={"ticket-title-p"}>Статус:</p>
                    <p><span className={"status-circle"}> </span>Открыта</p>
                </div>

                <div className={"ticket-page__column"}>
                    <p className={"ticket-title-p"}>Тема:</p>
                    <p>Сломался принтер</p>
                </div>
                <div className={"ticket-page__column"}>
                    <p className={"ticket-title-p"}>Приоритет:</p>
                    <p>Низкий</p>
                </div>
                <div className={"ticket-page__column"}>
                    <p className={"ticket-title-p"}>Комментарий:</p>
                    <p>Lorem ipsum dolor sit ores atals penit doleros lorem.
                        Lorem ipsum dolor sit ores atals penit doleros lorem.
                        Lorem ipsum dolor sit ores atals penit doleros lorem.
                        Lorem ipsum dolor sit ores atals penit doleros lorem.</p>
                </div>
                <div className={"ticket-page__column"}>
                    <p className={"ticket-title-p"}>Файлы:</p>
                    <p>F1</p>
                </div>
            </div>
        </div>
    )
}