import { Link } from "react-router-dom";
import './themes-settings.css';
import { ThemeWrapper } from "../../../../components/theme-wrapper/ThemeWrapper.jsx";
import { useEffect, useState } from "react";

export const ThemesSettings = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [themes, setThemes] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newThemeName, setNewThemeName] = useState("");

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
            .catch(err => console.error(err));
    };

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
                                <ThemeWrapper key={theme.id} themeInfo={theme} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
