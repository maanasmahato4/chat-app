import express from 'express';
import socketio from 'socket.io';
import http from 'node:http';
import { addUser, getUsersInARoom } from './user.js';

const app = express();
const httpServer = http.createServer(app);
const io = new socketio.Server(httpServer);

io.on('connect', (socket) => {
	socket.on('join', ({ name, room }, callback) => {
		const { error, user } = addUser({ id: socket.id, name: name, room: room });
		if (error) {
			return callback(error);
		}
		if (!user) {
			callback('Failed to add user');
			return;
		}
		socket.join(user.room);
		socket.emit('message', {
			user: 'admin',
			text: `${user.name}, welcome to the ${user.room}`,
		});
		socket.broadcast
			.to(user.room)
			.emit('message', { user: 'admin', text: `${user.name} has joined!` });
		io
			.to(user.room)
			.emit('roomData', { room: user.room, users: getUsersInARoom(user.room) });
		callback();
	});
});

httpServer.listen(3000, () => {
	console.log('server running');
});
