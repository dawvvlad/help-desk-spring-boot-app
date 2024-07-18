import './left-panel.css'
import {NavLink} from "react-router-dom";

export const LeftPanel = () => {


    return (
        <>
            <div className={"left-panel"}>
                <div className={"ticket-wrapper"}>
                    <h2>Ваши заявки</h2>
                    <div className={"ticket-wrapper links"}>
                        <NavLink className={"link active"} to={"alltickets"}>
                            Все
                        </NavLink>
                        <NavLink className={"link"} to={"/"}>
                            В работе
                        </NavLink>
                        <NavLink className={"link"} to={"/"}>
                            Закрытые
                        </NavLink>

                        <NavLink className={"button"} to={"/"}>Создать заявку</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}