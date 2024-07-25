import {Link} from "react-router-dom";
import {DateSelector} from "../../../../components/date-selector/DateSelector.jsx";


export const UploadOrderSettings = () => {

    return (
        <>
            <div className={"container right-panel"}>
                <Link to="/settings">Назад</Link>
                <DateSelector/>
            </div>
        </>
    )
}