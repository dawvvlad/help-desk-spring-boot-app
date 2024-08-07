import './left-panel.css'
import {NavLink} from "react-router-dom";

export const LeftPanelUser = () => {
    return (
        <>
            <div className={"left-panel"}>
                <div className={"link-wrapper"}>
                    <h2 className={"user-panel__h2"}>Ваши заявки</h2>
                    <div className={"link-wrapper links"}>
                        <NavLink className={({isActive}) => isActive ? 'link active' : 'link'} to={"tickets/all"}>
                            Все
                        </NavLink>
                        <NavLink className={"link"} to={"tickets/open"}>
                            Ожидают
                        </NavLink>
                        <NavLink className={"link"} to={"tickets/active"}>
                            В работе
                        </NavLink>
                        <NavLink className={"link"} to={"tickets/closed"}>
                            Закрытые
                        </NavLink>

                        <NavLink className={"button nav-button"} to={"tickets/create"}>Создать заявку</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}