import './header.css'
import {Link} from "react-router-dom";

export const Header = () => {
    return (
            <header className={"header"}>
                <div className={"logo"}>
                    <h2>HelpDesk App</h2>
                </div>
                <div className={"links"}>
                    <Link className={"link"} to={"/"}>Создать заявку</Link>
                    <Link className={"link"} to={"/"}>Профиль</Link>
                    <Link className={"link"} to={"/"}>Тикеты</Link>
                </div>
            </header>
    )
}