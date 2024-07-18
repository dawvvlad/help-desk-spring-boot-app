import '../left-panel.css'
import {NavLink} from "react-router-dom";

export const LeftPanelUser = () => {
    return (
        <>
            <div className={"left-panel"}>
                <div className={"ticket-wrapper"}>
                    <h2>Ваши заявки</h2>
                    <div className={"ticket-wrapper links"}>
                        <NavLink className={({isActive}) => isActive ? 'link active' : 'link'} to={"allTickets"}>
                            Все
                        </NavLink>
                        <NavLink className={"link"} to={"openTickets"}>
                            В работе
                        </NavLink>
                        <NavLink className={"link"} to={"closedTickets"}>
                            Закрытые
                        </NavLink>

                        <NavLink className={"button"} to={"createTicket"}>Создать заявку</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}