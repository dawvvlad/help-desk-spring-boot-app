import './ticket-form.css'
import { useEffect, useState } from "react";

export const DragFileInput = ({fls, setFls}) => {
    const [files, setFiles] = useState([]);
    const [dragging, setDragging] = useState(false);
    const [previews, setPreviews] = useState({}); // Хранение предварительных просмотров

    useEffect(() => {
        const newPreviews = {};

        files.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileType = file.type.split('/')[0];
                if (fileType === 'image') {
                    newPreviews[index] = e.target.result;
                    setPreviews(prev => ({ ...prev, ...newPreviews }));
                }
            };
            reader.readAsDataURL(file);
        });

        console.log(fls)
        setFls(files)
    }, [files]);

    const handleFiles = (event) => {
        const newFiles = Array.from(event.target.files);
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        const newFiles = Array.from(event.dataTransfer.files);
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
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
        setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
        setPreviews(prevPreviews => {
            const { [index]: _, ...rest } = prevPreviews;
            return rest;
        });
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
                            <img
                                src={previews[index] || ''}
                                alt={file.name}
                                id={`preview-${index}`}
                            />
                        ) : (
                            <div className="file-icon">📄</div>
                        )}
                        <button className="remove-btn" onClick={() => removeFile(index)}>
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
