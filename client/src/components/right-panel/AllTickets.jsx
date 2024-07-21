import { TicketLine } from "../ticket-line/TicketLine.jsx";
import { TicketTopPanel } from "../ticket-line/TicketTopPanel.jsx";
import './tickets-panel.css';
import { useEffect, useState } from "react";

export const AllTickets = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        setIsLoading(true);
        fetchItems(currentPage, pageSize)
            .then(data => {
                setTickets(data.content);
                setTotalPages(data.totalPages);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching tickets:", error);
                setIsLoading(false);
            });
    }, [currentPage, pageSize]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const fetchItems = async (page, size) => {
        const response = await fetch(`/api/v1/admin/ticketsPages?page=${page}&size=${size}`);
        if (!response.ok) {
            throw new Error("Failed to fetch tickets");
        }
        return response.json();
    };

    return (
        <>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <div className="container right-panel">
                    <TicketTopPanel />
                    <div className="tickets-container">
                        {tickets.map(ticket => {
                            console.log("Rendering ticket:", ticket); // Логируем каждый билет перед рендерингом
                            return <TicketLine key={ticket.id} id={ticket.id} value={ticket} />;
                        })}
                    </div>

                    <div>
                        <div>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index)}
                                    disabled={index === currentPage}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
