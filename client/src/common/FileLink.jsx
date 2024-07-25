
export const FileLink = ({ fileUrl }) => {
    return (
        <div>
            <a href={`/${fileUrl}`} target="_blank" rel="noopener noreferrer">
                Open {fileUrl}
            </a>
        </div>
    );
};
