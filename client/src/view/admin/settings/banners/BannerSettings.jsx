import { Link } from "react-router-dom";
import './banner-settings.css';
import { useEffect, useState } from "react";

export const BannerSettings = () => {
    const [banner, setBanner] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const statuses = {
        ACTIVE: 'Активен',
        INACTIVE: 'Неактивен'
    }

    useEffect(() => {
        setLoading(true); // Начинаем загрузку
        fetch("/api/v1/admin/banners")
            .then(response => response.json())
            .then(data => {
                console.log("Banners:", data);
                setBanner(data[0]);
                setTitle(data[0]?.title || ''); // Инициализируем title
                setDescription(data[0]?.description || ''); // Инициализируем description
                setLoading(false); // Завершаем загрузку
            });
    }, []);

    const handleActivateToggle = () => {
        const newStatus = banner.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
        fetch(`/api/v1/admin/changeBannerStatus/${banner.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
        })
            .then(response => response.json())
            .then(updatedBanner => {
                setBanner(prevBanner => ({ ...prevBanner, status: newStatus }));
            });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        fetch(`/api/v1/admin/changeBanner/${banner.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title || banner.title, // Используем значение из состояния или из исходного баннера
                description: description || banner.description // Используем значение из состояния или из исходного баннера
            })
        })
            .then(response => response.json())
            .then(updatedBanner => {
                setBanner(updatedBanner);
                setIsEditing(false);
            });
    };

    const handleCancel = () => {
        setIsEditing(false);
        setTitle(banner.title); // Восстанавливаем исходное значение
        setDescription(banner.description); // Восстанавливаем исходное значение
    };

    return (
        <>
            {loading ? <h2>Loading...</h2> :
                <div className="container right-panel">
                    <Link to="/settings" className="back-link">Назад</Link>
                    <div className="banner-wrapper">
                        <p><b>Титул</b>: {banner.title}</p>
                        <p><b>Описание</b>: {banner.description}</p>
                        <p><b>Статус</b>: {statuses[banner.status]}</p>
                    </div>
                    {isEditing ? (
                        <div className="edit-panel">
                            <textarea
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Title"
                                className="input-textarea"
                            />
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                                className="input-textarea"
                            />
                            <div className="button-group">
                                <button onClick={handleSave} className="save-button">Сохранить</button>
                                <button onClick={handleCancel} className="cancel-button">Отменить</button>
                            </div>
                        </div>
                    ) : (
                        <div className="button-group">
                            <button onClick={handleActivateToggle} className={`toggle-button ${banner.status}`}>
                                {banner.status === 'ACTIVE' ? 'Деактивировать' : 'Активировать'}
                            </button>
                            <button onClick={handleEdit} className="edit-button">Изменить</button>
                        </div>
                    )}
                </div>
            }
        </>
    );
};
