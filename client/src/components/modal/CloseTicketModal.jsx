import './close-ticket-modal.css'

export const CloseTicketModal = ({ show, handleClose, handleSubmit }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Комментарий</h2>
                <textarea id="comment" className="message-text"></textarea>
                <button className="button" onClick={() => handleSubmit(document.getElementById('comment').value)}>Отправить</button>
                <button className="button" onClick={handleClose}>Отмена</button>
            </div>
        </div>
    );
};
