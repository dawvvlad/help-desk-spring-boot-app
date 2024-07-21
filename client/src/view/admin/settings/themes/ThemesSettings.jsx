import {Link} from "react-router-dom";
import './themes-settings.css'
import {ThemeWrapper} from "../../../../components/theme-wrapper/ThemeWrapper.jsx";

export const ThemesSettings = () => {

    return (
        <>
            <div className="container right-panel">
                <div className="settings-container">
                    <Link className={"settings-link"} to="/settings">Назад</Link>
                    <div className="settings-content">
                        <ThemeWrapper/>
                    </div>
                </div>
            </div>
        </>
    )
}