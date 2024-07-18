import React, { useEffect, useRef, useState } from 'react';
import './create-ticket.css';

export const CreateTicket = () => {
    const fileselectRef = useRef(null);
    const filedragRef = useRef(null);
    const messagesRef = useRef(null);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (window.File && window.FileList && window.FileReader) {
            Init();
        }
    }, []);

    useEffect(() => {
        console.log(files)
    }, [files]);

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
    }

    function FileDragHover(e) {
        e.stopPropagation();
        e.preventDefault();
        e.target.className = (e.type === "dragover" ? "hover" : "");
    }

    function FileSelectHandler(e) {
        FileDragHover(e);
        let newFiles = Array.from(e.target.files || e.dataTransfer.files);
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }

    return (
        <div className={"container right-panel"}>
            <div>
                <h1>Create</h1>
            </div>

            <form className={"form"}>
                <textarea name="text" placeholder="Текст сообщения" className={"message-text"} />

                <fieldset>
                    <input type="hidden" id="MAX_FILE_SIZE" name="MAX_FILE_SIZE" value="300000" />
                    <div className={"input-wrapper"}>
                        <label htmlFor="fileselect">Выберите файлы для загрузки:</label>
                        <br />
                        <input type={"file"} id="fileselect" name="fileselect[]" multiple="multiple"
                               ref={fileselectRef} className={"input input__file"} />
                        <div id="filedrag" ref={filedragRef}>Или перетащите их сюда</div>
                    </div>
                </fieldset>
            </form>
            <div id="messages" ref={messagesRef}>
                <p>Файлов выбрано: {files.length}</p>
            </div>
        </div>
    );
}
