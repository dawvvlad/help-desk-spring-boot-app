import './header.css'
import {useEffect} from "react";
import {NavLink} from "react-router-dom";

export const Header = ({user}) => {
    const username = user.info?.cn?.[0] || "Имя пользователя";

    // Разделите имя на части
    let avatarArray = username.split(" ");
    // Создайте аватар из первых букв имени и фамилии
    const avatar = avatarArray.length > 1
        ? avatarArray[0][0] + avatarArray[1][0]
        : username[0] || "A"; // Значение по умолчанию если имя пустое

    return (
        <header className={"header"}>
            <div className={"logo"}>
                <h2>Служба техподдержки</h2>
            </div>
            <div className={"container user-info"}>
                <p className={"text avatar"}>{avatar}</p>
                <p className={"text"}>
                    {username}
                </p>
                
                <NavLink to={"/login"}>Выйти</NavLink>
            </div>
        </header>
    )
}