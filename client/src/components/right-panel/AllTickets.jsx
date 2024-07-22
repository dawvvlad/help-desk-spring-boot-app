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
    const user = 1;

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const data = await fetchItems(currentPage, pageSize);
                setTickets(data.content);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error("Error fetching tickets:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [currentPage, pageSize]);

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
        }
    };

    const fetchItems = async (page, size) => {
        const response = user === 0 ? await fetch(`/api/v1/admin/ticketsPages?page=${page}&size=${size}`):
            await fetch(`/api/v1/ticketsPages?page=${page}&size=${size}&username=vlad_g`);
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
                        {tickets.map(ticket => (
                            <TicketLine key={ticket.id} id={ticket.id} value={ticket} />
                        ))}
                    </div>

                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                className={"button"}
                                key={index}
                                onClick={() => handlePageChange(index)}
                                disabled={index === currentPage}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};
