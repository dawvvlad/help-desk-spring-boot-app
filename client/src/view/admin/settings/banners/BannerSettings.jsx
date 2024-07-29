import {Link} from "react-router-dom";
import './banner-settings.css'
import {useEffect, useState} from "react";

export const BannerSettings = () => {
    const [banner, setBanner] = useState({});

    useEffect(() => {
        fetch("/api/v1/admin/banners")
            .then(data => data.json())
            .then(e => {
                console.log("Banners:", e);
                setBanner(e[0]);
            });
    }, []);


    return (
        <>
            <div className="container right-panel">
                <Link to="/settings">Назад</Link>
                <h1>Banner Settings</h1>
            </div>
        </>
    )
}