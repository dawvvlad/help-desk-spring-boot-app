const stompClient = new StompJs.Client({
    brokerURL: 'ws://192.168.11.126:8080/ws'
});

export {stompClient}