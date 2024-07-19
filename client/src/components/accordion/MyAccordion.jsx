import './my-accordion.css';
import { useEffect, useState } from "react";
import { ItcAccordion } from "../../Accordion.js";

export const MyAccordion = ({ themes }) => {
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

    const addTheme = (id) => {
        setSelectedTheme(id);
        console.log("Selected Theme ID:", selectedTheme);
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
                            onClick={() => addTheme(theme.id)}
                        >
                            {theme.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
