const stompClient = new StompJs.Client({
    brokerURL: 'ws://192.168.128.1:8080/ws'
});

export {stompClient}