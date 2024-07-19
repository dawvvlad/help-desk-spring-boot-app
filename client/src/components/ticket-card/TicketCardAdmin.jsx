import './ticket-card.css'

// eslint-disable-next-line react/prop-types
export const TicketCardAdmin = ({ticketId}) => {

    const status = 'В работе'

    return (
        <div className={"container right-panel"}>
            <div className={"ticket-page"}>
                <h2>
                    Заявка #{ticketId} (Admin)
                </h2>
                <div className={"ticket-page__column"}>
                    <p className={"ticket-title-p"}>Статус:</p>
                    <p><span className={"status-circle"}> </span>Открыта</p>
                </div>
                <div className={"ticket-page__column"}>
                    <p className={"ticket-title-p"}>Отправитель:</p>
                    <p>Голиков Владислав (golikov_v)</p>
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
                <div className={"ticket-page__column"}>
                    <p className={"ticket-title-p"}>Дата/Время:</p>
                    <p>24.12.2023 18:00</p>
                </div>

                {status === 'В работе' ? <button className={"button closing-button"}>Закрыть заявку</button> :
                    <button className={"button"}>Взять в работу</button>}
            </div>
        </div>
    )
}