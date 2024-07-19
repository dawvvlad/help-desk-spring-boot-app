import './create-ticket.css';
import {DragFileInput} from "../../form/DragFileInput.jsx";
import {TicketForm} from "../../form/TicketForm.jsx";
import {MyAccordion} from "../../accordion/MyAccordion.jsx";
import {useContext, useEffect} from "react";
import {ContextProvider} from "../../../context/Context.jsx";

export const CreateTicket = () => {
    const ths = [
        { id: '1', name: 'Не работает 1С' },
        { id: '2', name: 'Сломался принтер' },
        { id: '3', name: 'Нет туалетной бумаги' },
        { id: '4', name: 'Нужна новая мышка' },
        { id: '5', name: 'Требуется настройка VPN' },
    ];
    const { setResources } = useContext(ContextProvider);

    useEffect(() => {
        setResources(ths)
    }, []);

    return (
        <div className={"container right-panel"}>
            <h2 className={"create-h2"}>
                Создание новой заявки
            </h2>
            <div className="form-container">
                <MyAccordion themes={ths}/>
                <TicketForm/>
                <DragFileInput/>

                <button className={"button"}>Отправить заявку</button>
            </div>

        </div>
    );
}
