import './create-ticket.css';
import { DragFileInput } from "../../form/DragFileInput.jsx";
import { TicketForm } from "../../form/TicketForm.jsx";
import { MyAccordion } from "../../accordion/MyAccordion.jsx";
import { useContext, useEffect, useState } from "react";
import { ContextProvider } from "../../../context/Context.jsx";

export const CreateTicket = () => {

    //test - delete
    const ths = [
        { id: '1', name: 'Не работает 1С' },
        { id: '2', name: 'Сломался принтер' },
        { id: '3', name: 'Нет туалетной бумаги' },
        { id: '4', name: 'Нужна новая мышка' },
        { id: '5', name: 'Требуется настройка VPN' },
    ];

    const { setResources } = useContext(ContextProvider);
    const [files, setFiles] = useState([]);
    const [ticket, setTicket] = useState({
        //put username
        sender: "vlad_g",
        executor: null,
        status: "OPEN",
        dateTime: "2024-11-2 19:30",
        priority: '', // Инициализируем приоритет
        text: ''   // Инициализируем сообщение
    });

    function postTicket() {
        const requestData = new FormData();
        requestData.append("message", JSON.stringify(ticket));
        files.forEach(e => {
            requestData.append("file", e);
        });

        fetch("/api/v1/createTicket", {
            method: "post",
            body: requestData
        })
            .then(data => data.json())
            .then(e => console.log(e))
            .catch(err => console.error(err));
    }

    useEffect(() => {
        setResources(ths);
    }, [ths, setResources]);

    return (
        <div className={"container right-panel"}>
            <h2 className={"create-h2"}>
                Создание новой заявки
            </h2>
            <div className="form-container">
                <MyAccordion themes={ths} ticket={ticket} setTicket={setTicket} />
                <TicketForm ticket={ticket} setTicket={setTicket} />
                <DragFileInput fls={files} setFls={setFiles} />

                <button onClick={postTicket} className={"button"}>Отправить заявку</button>
            </div>
        </div>
    );
}
