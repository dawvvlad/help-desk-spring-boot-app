import './settings.css'
import {Link} from "react-router-dom";

export const Settings = () => {

    return (
        <>
            <div className={"container right-panel"}>
                <div className={"settings-panel"}>
                    <h2 className={"admin-panel__h2"}>Инструменты администратора</h2>
                    <Link className={'link'} to={"/settings/themes"}>
                        Темы заявок
                    </Link>

                    <Link className={'link'} to={"/settings/banners"}>
                        Баннеры
                    </Link>

                    <Link className={'link'} to={"/settings/upload-order"}>
                        Выгрузить отчет
                    </Link>
                </div>
            </div>
        </>
    )
}