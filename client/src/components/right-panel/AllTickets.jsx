import {Preloader} from "../preloader/Preloader.jsx";
import {TicketLine} from "../ticket-line/TicketLine.jsx";
import {TicketTopPanel} from "../ticket-line/TicketTopPanel.jsx";
import './tickets-panel.css';
import {useEffect, useState} from "react";

export const AllTickets = ({ user, isAdmin }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(14);
    const userInfo = user?.info?.username;

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const data = await fetchItems(currentPage, pageSize);
                setTickets(data.content);
                setTotalPages(data.totalPages || 0);
            } catch (error) {
                console.error("Error fetching tickets:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [currentPage, pageSize, isAdmin, userInfo]);

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
        }
    };

    const fetchItems = async (page, size) => {
        const response = isAdmin
            ? await fetch(`/api/v1/admin/ticketsPages?page=${page}&size=${size}`)
            : await fetch(`/api/v1/ticketsPages?page=${page}&size=${size}&username=${userInfo}`);
        if (!response.ok) {
            throw new Error("Failed to fetch tickets");
        }
        return await response.json() || [];
    };

    const renderPageButtons = () => {
        const buttons = [];

        // Always show first page button
        buttons.push(
            <button
                className="button"
                key={0}
                onClick={() => handlePageChange(0)}
                disabled={currentPage === 0}
            >
                1
            </button>
        );

        // Show buttons for pages around the current page
        if (currentPage > 2) {
            buttons.push(<span key="left-ellipsis">...</span>);
        }

        for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages - 2, currentPage + 1); i++) {
            buttons.push(
                <button
                    className="button"
                    key={i}
                    onClick={() => handlePageChange(i)}
                    disabled={i === currentPage}
                >
                    {i + 1}
                </button>
            );
        }

        if (currentPage < totalPages - 3) {
            buttons.push(<span key="right-ellipsis">...</span>);
        }

        // Always show last page button
        if (totalPages > 1) {
            buttons.push(
                <button
                    className="button"
                    key={totalPages - 1}
                    onClick={() => handlePageChange(totalPages - 1)}
                    disabled={currentPage === totalPages - 1}
                >
                    {totalPages}
                </button>
            );
        }

        return buttons;
    };

    return (
        <>
            {isLoading ? (
                <Preloader/>
            ) : (
                <div className="container right-panel">
                    <TicketTopPanel />
                    <div className="tickets-container">
                        {tickets.map(ticket => (
                            <TicketLine key={ticket.id} id={ticket.id} value={ticket} />
                        ))}
                    </div>

                    <div className="pagination">
                        {renderPageButtons()}
                    </div>
                </div>
            )}
        </>
    );
};
