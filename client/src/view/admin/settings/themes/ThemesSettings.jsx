import { Link } from "react-router-dom";
import './themes-settings.css';
import { useEffect, useState } from "react";

export const ThemesSettings = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [themes, setThemes] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newThemeName, setNewThemeName] = useState("");
    const [editThemeId, setEditThemeId] = useState(null);
    const [editThemeName, setEditThemeName] = useState("");

    useEffect(() => {
        setIsLoading(true);
        fetch("/api/v1/themes")
            .then(data => data.json())
            .then(data => {
                setThemes(data);
            })
            .catch(err => console.error(err))
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const handleCreateClick = () => {
        setShowCreateForm(true);
    };

    const handleCreateTheme = () => {
        if (newThemeName.trim() === "") {
            alert("Название темы не может быть пустым");
            return;
        }

        const newTheme = { name: newThemeName.trim() };

        fetch("/api/v1/admin/createTheme", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTheme)
        })
            .then(response => response.json())
            .then(data => {
                setThemes([...themes, data]);
                setNewThemeName("");
                setShowCreateForm(false);
            })
            .catch(err => console.error(err))
            .finally(() => window.location.reload());
    };

    const handleEditClick = (id, name) => {
        setEditThemeId(id);
        setEditThemeName(name);
    };

    const handleSaveEdit = (id) => {
        if (editThemeName.trim() === "") {
            alert("Название темы не может быть пустым");
            return;
        }

        const updatedTheme = { name: editThemeName.trim() };

        fetch(`/api/v1/admin/changeThemeName/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedTheme)
        })
            .then(response => response.json())
            .then(data => {
                setThemes(themes.map(theme => (theme.id === id ? data : theme)));
                setEditThemeId(null);
                setEditThemeName("");
            })
            .catch(err => console.error(err))
            .finally(() => window.location.reload());
    };

    const handleCancelEdit = () => {
        setEditThemeId(null);
        setEditThemeName("");
    };

    function handleDeleteTheme (id) {
        fetch(`/api/v1/admin/deleteTheme/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    setThemes(themes.filter(theme => theme.id !== id));
                } else {
                    alert("Тема используется в заявках");
                }
            })
            .catch(err => console.error(err))
            .finally(() => {
                window.location.reload();
            });
    }

    return (
        <>
            {isLoading ? (
                <h1>Loading..</h1>
            ) : (
                <div className="container right-panel">
                    <div className="settings-container">
                        <Link className={"settings-link"} to="/settings">Назад</Link>
                        <div className="settings-content">
                            <button className={"button"} onClick={handleCreateClick}>
                                Создать тему
                            </button>
                            {showCreateForm && (
                                <div className="create-theme-form">
                                    <textarea
                                        value={newThemeName}
                                        onChange={(e) => setNewThemeName(e.target.value)}
                                        placeholder="Введите название новой темы"
                                    />
                                    <button className={"button"} onClick={handleCreateTheme}>
                                        Отправить
                                    </button>
                                </div>
                            )}
                            {themes.map(theme => (
                                <div key={theme.id} className="theme-item">
                                    {editThemeId === theme.id ? (
                                        <div className="edit-theme-form">
                                            <textarea
                                                value={editThemeName}
                                                onChange={(e) => setEditThemeName(e.target.value)}
                                            />
                                            <button className={"button"} onClick={() => handleSaveEdit(theme.id)}>
                                                Сохранить
                                            </button>
                                            <button className={"button"} onClick={handleCancelEdit}>
                                                Отменить
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="theme-info">
                                            <span>{theme.name}</span>
                                            <div className={"theme-info__buttons"}>
                                                <button className={"button"}
                                                        onClick={() => handleEditClick(theme.id, theme.name)}>
                                                    Изменить
                                                </button>
                                                <button onClick={() => handleDeleteTheme(theme.id)} className={"button"}>
                                                    Удалить
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
