import React, { useEffect, useRef } from 'react';
import './create-ticket.css';

export const CreateTicket = () => {
    const fileselectRef = useRef(null);
    const filedragRef = useRef(null);
    const messagesRef = useRef(null);

    /* вывод сообщений */
    function Output(msg) {
        let m = messagesRef.current;
        m.innerHTML = msg + m.innerHTML;
    }

    useEffect(() => {
        if (window.File && window.FileList && window.FileReader) {
            Init();
        }
    }, []);

    /* инициализация */
    function Init() {
        let fileselect = fileselectRef.current;
        let filedrag = filedragRef.current;

        /* выбор файла */
        fileselect.addEventListener("change", FileSelectHandler, false);
        /* сброс файла */
        filedrag.addEventListener("dragover", FileDragHover, false);
        filedrag.addEventListener("dragleave", FileDragHover, false);
        filedrag.addEventListener("drop", FileSelectHandler, false);
        filedrag.style.display = "block";

        /* удаление кнопки сабмитта */
    }

    function FileDragHover(e) {
        e.stopPropagation();
        e.preventDefault();
        e.target.className = (e.type === "dragover" ? "hover" : "");
    }

    function FileSelectHandler(e) {
        FileDragHover(e);
        // проходимся по объекту FileList
        let files = e.target.files || e.dataTransfer.files;
        // парсим все объекты типа File
        for (let i = 0, f; f = files[i]; i++) {
            ParseFile(f);
        }
    }

    function ParseFile(file) {
        Output(
            "<p>File information: <strong>" + file.name +
            "</strong> type: <strong>" + file.type +
            "</strong> size: <strong>" + file.size +
            "</strong> bytes</p>"
        );
    }

    return (
        <div className={"container right-panel"}>

            <div>
                <h1>
                    Create
                </h1>
            </div>

            <form className={"form"}>
                <textarea name="text" placeholder="Текст сообщения" className={"message-text"}/>

                <fieldset>
                    <input type="hidden" id="MAX_FILE_SIZE" name="MAX_FILE_SIZE" value="300000"/>
                    <div>
                        <label htmlFor="fileselect">Выберите файлы для загрузки:</label>
                        <input type={"file"} id="fileselect" name="fileselect[]" multiple="multiple"
                               ref={fileselectRef}/>
                        <div id="filedrag" ref={filedragRef}>Или перетащите их сюда</div>
                    </div>
                </fieldset>
            </form>
            <div id="messages" ref={messagesRef}></div>
        </div>
    );
}