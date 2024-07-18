import '../left-panel.css'
import {NavLink} from "react-router-dom";

export const LeftPanelUser = () => {
    return (
        <>
            <div className={"left-panel"}>
                <div className={"link-wrapper"}>
                    <h2>Ваши заявки</h2>
                    <div className={"link-wrapper links"}>
                        <NavLink className={({isActive}) => isActive ? 'link active' : 'link'} to={"all_tickets"}>
                            Все
                        </NavLink>
                        <NavLink className={"link"} to={"open_tickets"}>
                            В работе
                        </NavLink>
                        <NavLink className={"link"} to={"closed_tickets"}>
                            Закрытые
                        </NavLink>

                        <NavLink className={"button"} to={"create_ticket"}>Создать заявку</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}