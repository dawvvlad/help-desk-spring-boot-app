import './left-panel.css'
import {NavLink} from "react-router-dom";

export const LeftPanelAdmin = () => {
    return (
        <>
            <div className={"left-panel"}>
                <div className={"link-wrapper"}>
                    <h2 className={"admin-panel__h2"}>Панель администратора</h2>
                    <div className={"link-wrapper links"}>
                        <NavLink className={({isActive}) => isActive ? 'link active' : 'link'} to={"tickets/all"}>
                            Все
                        </NavLink>
                        <NavLink className={"link"} to={"tickets/new"}>
                            Новые
                        </NavLink>
                        <NavLink className={"link"} to={"tickets/open"}>
                            В работе
                        </NavLink>

                        <NavLink className={"link"} to={"tickets/closed"}>
                            Закрытые
                        </NavLink>

                        <NavLink className={"button nav-button"} to={"settings"}>Инструменты</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}