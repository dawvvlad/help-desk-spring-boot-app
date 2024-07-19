import './page-not-found.css'
import {NavLink} from "react-router-dom";

export const PageNotFound = () => {
    return (
        <>
            <div className={"container page-not-found"}>
                <h2 style={{fontSize:"20px"}}>
                    Страницы не существует.
                </h2>
                <NavLink to={"/"} activeClassName={"active"}>Перейти на главную</NavLink>
            </div>
        </>
    )
}