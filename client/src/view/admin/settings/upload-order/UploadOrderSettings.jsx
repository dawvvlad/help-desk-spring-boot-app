import {Link} from "react-router-dom";
import {DateSelector} from "../../../../components/date-selector/DateSelector.jsx";
import './upload-settings.css'

export const UploadOrderSettings = () => {

    return (
        <>
            <div className={"container right-panel"}>
                <div className={"upload-settings"}>
                    <Link to="/settings">Назад</Link>
                    <DateSelector/>
                </div>
            </div>
        </>
    )
}