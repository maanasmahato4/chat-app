import express from 'express';
import socketio from 'socket.io';
import http from 'node:http';

const app = express();
const httpServer = http.createServer(app);
const io = new socketio.Server(httpServer);

httpServer.listen(3000, () => {
	console.log('server running');
});
