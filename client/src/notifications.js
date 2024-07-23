export const showNotification = (title, options) => {
    if (Notification.permission === 'granted') {
        const notification = new Notification(title, options);
        notification.onclick = () => {
            window.focus();
            notification.close();
        };
    }
};
