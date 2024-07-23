const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8080/ws'
});

export {stompClient}