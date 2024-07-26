const host = document.location.host;

const stompClient = new StompJs.Client({
    brokerURL: `ws://${host}/ws`
});

export {stompClient}