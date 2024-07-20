import './create-ticket.css';
import {DragFileInput} from "../../form/DragFileInput.jsx";
import {TicketForm} from "../../form/TicketForm.jsx";
import {MyAccordion} from "../../accordion/MyAccordion.jsx";
import {useContext, useEffect, useState} from "react";
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
    const [files, setFiles] = useState([]);

    const requestData = new FormData();
    const ticket = {
        id: 0,
        sender: "vlad_g",
        executor: null,
        themeId: 1,
        text: "hello world",
        status: "OPEN",
        priority: "LOW",
        dateTime: "2024-11-2 19:30"
    }

    requestData.append("message", JSON.stringify(ticket))
    files.forEach(e => {
        requestData.append("file", e)
    })


    function postTicket() {
        fetch("/api/v1/createTicket", {
            method: "post",
            body: requestData

        })
            .then(data => data.json())
            .then(e => console.log(e))
            .catch(err => console.error(err))
    }

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
                <DragFileInput fls={files} setFls={setFiles}/>

                <button onClick={postTicket} className={"button"}>Отправить заявку</button>
            </div>

        </div>
    );
}