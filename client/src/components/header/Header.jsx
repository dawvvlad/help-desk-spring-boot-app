import './header.css'
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {Banner} from '../banner/Banner.jsx';

export const Header = ({user}) => {
    const username = user.info?.cn?.[0] || "Имя пользователя";
    const [banner, setBanner] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        console.log(user.info?.authorities);

        fetch("/api/v1/admin/banners")
            .then(data => data.json())
            .then(e => {
                console.log("Banners:", e);
                if(e[0].status === 'ACTIVE') {
                    setBanner(e[0]);
                    setIsVisible(true);
                }
            });
    }, []);

    useEffect(() => {
        setIsAdmin(user.info?.authorities.some(auth => auth.authority === 'Администраторы'));
        console.log("header admin:", isAdmin);
    }, [isAdmin]);

    let avatarArray = username.split(" ");
    const avatar = avatarArray.length > 1
        ? avatarArray[0][0] + avatarArray[1][0]
        : username[0] || "A"; // Значение по умолчанию если имя пустое

    return (
        <>
            {isVisible && !isAdmin ?
                <Banner banner={banner} isVisible = {isVisible} setIsVisible ={setIsVisible}/> :
                <header className={"header"}>
                    <div className={"logo"}>
                        <h2>Служба техподдержки</h2>
                    </div>
                    <div className={"container user-info"}>
                        <div className={"user-info__panel"}>
                            <p className={"text avatar"}>{avatar}</p>
                            <p className={"text name-text"}>
                                {username}
                            </p>
                        </div>

                        <NavLink to={"/login"}>Выйти</NavLink>
                    </div>
                </header>
            }
        </>
    )
}