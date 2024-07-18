import './ticket-form.css'
import {useEffect, useState} from "react";

export const DragFileInput = () => {
    const [files, setFiles] = useState([]);
    const [dragging, setDragging] = useState(false);

    const handleFiles = (event) => {
        const newFiles = Array.from(event.target.files);
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        const newFiles = Array.from(event.dataTransfer.files);
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setDragging(false);
    };

    const removeFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const renderPreview = (file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileType = file.type.split('/')[0];
            if (fileType === 'image') {
                document.getElementById(`preview-${index}`).src = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="upload-container">
            <input
                type="file"
                id="fileInput"
                multiple
                onChange={handleFiles}
                style={{ display: 'none' }}
            />
            <div
                id="dropZone"
                className={`drop-zone ${dragging ? 'dragging' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => document.getElementById('fileInput').click()}
            >
                <p>{dragging ? 'Поместите файл' : 'Переместите файлы или нажмите для выбора'}</p>
            </div>
            <div id="preview" className="preview">
                {files.map((file, index) => (
                    <div key={index} className="preview-item">
                        {file.type.startsWith('image/') ? (
                            <img id={`preview-${index}`} alt={file.name} />
                        ) : (
                            <div className="file-icon">📄</div>
                        )}
                        <button className="remove-btn" onClick={() => removeFile(index)}>
                            ×
                        </button>
                    </div>
                ))}
            </div>
            {files.map((file, index) => renderPreview(file, index))}
        </div>
    );
}
