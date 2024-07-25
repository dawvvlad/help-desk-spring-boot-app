import {useState} from "react";

export const DateSelector = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleDownload = async () => {
        try {
            const response = await fetch(`/api/v1/excel?startDate=${startDate}&endDate=${endDate}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(new Blob([blob]));
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
                    type="text"
                    placeholder="DD.MM.YYYY, HH:MM:SS"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </label>
            <label>
                End Date:
                <input
                    type="text"
                    placeholder="DD.MM.YYYY, HH:MM:SS"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </label>
            <button onClick={handleDownload}>Create Report</button>
        </div>
    );
}