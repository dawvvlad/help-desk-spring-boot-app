import './priority-selector.css';
import { useEffect, useState } from "react";

const PrioritySelector = ({ ticket, setTicket }) => {
    const [selectedPriority, setSelectedPriority] = useState(ticket.priority || '');

    useEffect(() => {
        setSelectedPriority(ticket.priority || '');
    }, [ticket.priority]);

    const handlePriorityChange = (event) => {
        const newPriority = event.target.value;
        setSelectedPriority(newPriority);
        console.log(`Выбранный приоритет: ${newPriority}`);
        console.log(`ID выбранного элемента: ${event.target.id}`);

        setTicket({
            ...ticket,
            priority: newPriority
        });
    };

    return (
        <div className={"priority-container"}>
            <h2 className={"priority-selector__title"}>Выберите приоритет заявки: </h2>
            <div className="priority-selector">
                <label className="priority-option">
                    <input
                        type="radio"
                        name="priority"
                        value="LOW"
                        id="LOW"
                        checked={selectedPriority === 'LOW'}
                        onChange={handlePriorityChange}
                    />
                    <span className="checkmark"></span>
                    Низкий
                </label>
                <label className="priority-option">
                    <input
                        type="radio"
                        name="priority"
                        value="MEDIUM"
                        id="MEDIUM"
                        checked={selectedPriority === 'MEDIUM'}
                        onChange={handlePriorityChange}
                    />
                    <span className="checkmark"></span>
                    Средний
                </label>
                <label className="priority-option">
                    <input
                        type="radio"
                        name="priority"
                        value="HIGH"
                        id="HIGH"
                        checked={selectedPriority === 'HIGH'}
                        onChange={handlePriorityChange}
                    />
                    <span className="checkmark"></span>
                    Высокий
                </label>
            </div>
        </div>
    );
};

export default PrioritySelector;
