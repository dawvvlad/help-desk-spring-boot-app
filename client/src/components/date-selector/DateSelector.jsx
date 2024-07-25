import { useState } from "react";

export const DateSelector = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}.${month}.${year}`;
    };

    const handleDownload = async () => {
        try {
            const formattedStartDate = formatDate(startDate);
            const formattedEndDate = formatDate(endDate);

            const response = await fetch(`/api/v1/excel?startDate=${formattedStartDate}&endDate=${formattedEndDate}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'tickets_report.xlsx');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            } else {
                console.error('Error downloading the report', response.statusText);
            }
        } catch (error) {
            console.error('Error downloading the report', error);
        }
    };

    return (
        <div>
            <label>
                Start Date:
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </label>
            <label>
                End Date:
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </label>
            <button onClick={handleDownload}>Create Report</button>
        </div>
    );
};
