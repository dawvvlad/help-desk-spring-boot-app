import './my-accordion.css';
import { useEffect, useState } from "react";
import { ItcAccordion } from "../../Accordion.js";

// eslint-disable-next-line react/prop-types
export const MyAccordion = ({ themes, ticket, setTicket }) => {
    const [selectedTheme, setSelectedTheme] = useState(null);

    useEffect(() => {
        const accordion = new ItcAccordion(document.querySelector('.accordion'), {
            alwaysOpen: true
        });

        return () => {
            // Cleanup event listeners
            accordion._el.removeEventListener('click', accordion.addEventListener);
        };
    }, []);

    useEffect(() => {
        console.log(selectedTheme);
    }, [selectedTheme]);

    const handleThemeClick = (id) => {
        setSelectedTheme(prev => prev === id ? null : id);
        setTicket({
            ...ticket,
            themeId: id
        })
    };

    return (
        <div id="accordion" className="accordion">
            <div className="accordion__item">
                <div className="accordion__header">
                    Выберите тему
                </div>
                <div className="accordion__body">
                    {/* eslint-disable-next-line react/prop-types */}
                    {themes.map((theme) => (
                        <div
                            key={theme.id}
                            className={`accordion__content ${selectedTheme === theme.id ? 'selected' : ''}`}
                            data-id={theme.id}
                            onClick={() => handleThemeClick(theme.id)}
                        >
                            {theme.name}
                        </div>
                    ))}
                    <div
                        key={themes.length}
                        className={`accordion__content ${selectedTheme === null ? 'selected' : ''}`}
                        data-id={null}
                        onClick={() => handleThemeClick(null)}
                    >
                        Другое (нет темы)...
                    </div>
                </div>
            </div>
        </div>
    );
};
