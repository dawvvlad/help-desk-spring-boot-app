import { TicketLine } from "../ticket-line/TicketLine.jsx";
import { TicketTopPanel } from "../ticket-line/TicketTopPanel.jsx";
import './tickets-panel.css';
import { useEffect, useState } from "react";

export const AllTickets = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetch("/api/v1/admin/tickets")
            .then(response => response.json())
            .then(data => {
                console.log("Received tickets:", data); // Логируем полученные данные
                setTickets(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching tickets:", error);
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <div className="container right-panel">
                    <TicketTopPanel/>
                    <div className="tickets-container">
                        {tickets.map(ticket => {
                            console.log("Rendering ticket:", ticket); // Логируем каждый билет перед рендерингом
                            return <TicketLine key={ticket.id} id={ticket.id} value={ticket}/>;
                        })}
                    </div>
                </div>
            )}
        </>
    );
};
