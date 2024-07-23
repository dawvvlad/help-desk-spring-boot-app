import './create-ticket.css';
import { DragFileInput } from "../../form/DragFileInput.jsx";
import { TicketForm } from "../../form/TicketForm.jsx";
import { MyAccordion } from "../../accordion/MyAccordion.jsx";
import {useContext, useEffect, useState} from "react";
import {stompClient} from "../../../websocket/webSocketConfig.js";
import {ContextProvider} from "../../../context/Context.jsx";

export const CreateTicket = ({user}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [themes, setThemes] = useState([]);
    const [files, setFiles] = useState([]);
    const userName = user?.info?.username;
    const { resources, setResources } = useContext(ContextProvider);

    useEffect(() => {
        console.log(userName);
    }, []);

    const [ticket, setTicket] = useState({
        //put username
        sender: userName,
        executor: null,
        status: "OPEN",
        dateTime: "2024-11-2 19:30",
        priority: '', // Инициализируем приоритет
        text: ''   // Инициализируем сообщение
    });

    function postTicket() {
        if(!ticket.priority) {
            alert('Выберите приоритет заявки');
            return;
        }

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
            .then(() => {
                window.location.reload();
            })
            .catch(err => console.error(err));

        stompClient.publish({
            destination: "/app/admin",
            body: JSON.stringify({
                message: "Hello",
                recipientUsername: userName,
            })
        })
    }

    useEffect(() => {
        setIsLoading(true)
        fetch("/api/v1/themes")
            .then(data => data.json())
            .then(data => {
                setThemes(data)
            })
            .catch(err => console.error(err))
            .finally(() =>{
                setIsLoading(false);
            });

    }, []);

    return (
        <>
            {isLoading ?
                <h1> Loading...</h1> :
                <div className={"container right-panel"}>
                    <h2 className={"create-h2"}>
                        Создание новой заявки
                    </h2>
                    <div className="form-container">
                        <MyAccordion themes={themes} ticket={ticket} setTicket={setTicket}/>
                        <TicketForm ticket={ticket} setTicket={setTicket}/>
                        <DragFileInput fls={files} setFls={setFiles}/>

                        <button onClick={postTicket} className={"button"}>Отправить заявку</button>
                    </div>
                </div>}
        </>
    );
}
