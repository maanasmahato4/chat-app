import React, { useEffect, useState } from 'react';
import { User } from '../../@types/index.spec';
import io, { Socket } from 'socket.io-client';
import styles from './chat.module.css';
interface ChatComponentProps {
	user: User;
}

interface Message {
	message: string;
	user: string;
}

let socket: Socket;

const Chat: React.FC<ChatComponentProps> = ({ user }): React.ReactElement => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [users, setUsers] = useState<User[]>([]);
	console.log(messages, users);
	useEffect(() => {
		socket = io('http://localhost:3000', {
			transports: ['websocket', 'polling', 'flashsocket'],
		});

		socket.emit('join', { name: user.name, room: user.room }, (error: any) => {
			if (error) {
				console.error(error);
			}
		});
	}, [user]);

	useEffect(() => {
		socket.on('message', (message: Message) => {
			setMessages((messages) => [...messages, message]);
		});

		socket.on('roomData', ({ users }) => {
			setUsers(users);
		});
	}, []);
	return <div>Chat</div>;
};

export default Chat;
