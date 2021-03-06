import io from 'socket.io-client/dist/socket.io'

const connectionConfig = {
    jsonp: false,
    reconnection: true,
    reconnectionDelay: 100,
    reconnectionAttempts: 100000,
    transports: ['websocket'], // you need to explicitly tell it to use websockets
};

const socket = io('http://192.168.0.106:3000/', connectionConfig);

socket.on('connect', () => {
});
export default socket;