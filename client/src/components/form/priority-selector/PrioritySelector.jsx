import './priority-selector.css'
import {useState} from "react"; // Подключаем стили

const PrioritySelector = () => {
    // Состояние для хранения выбранного приоритета
    const [selectedPriority, setSelectedPriority] = useState('');

    // Функция для обработки изменения выбора
    const handlePriorityChange = (event) => {
        const newPriority = event.target.value;
        setSelectedPriority(newPriority);
        console.log(`Выбранный приоритет: ${newPriority}`);
        console.log(`ID выбранного элемента: ${event.target.id}`);
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
