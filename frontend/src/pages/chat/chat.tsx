import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { User } from '../../@types/index.spec';
import io, { Socket } from 'socket.io-client';
import styles from './chat.module.css';
interface ChatComponentProps {
	user: User;
}

interface Message {
	text: string;
	user: string;
}

let socket: Socket;

const Chat: React.FC<ChatComponentProps> = ({ user }): React.ReactElement => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [users, setUsers] = useState<User[]>([]);
	const [userMessage, setUserMessage] = useState<string>('');
	console.log(messages, users);

	function sendMessage(): void {
		socket.emit('sendMessage', userMessage);
		setUserMessage('');
	}

	useEffect(() => {
		socket = io('http://localhost:3000', {
			transports: ['websocket', 'polling', 'flashsocket'],
		});

		socket.emit(
			'join',
			{ name: user.name, room: user.room },
			(error: unknown) => {
				if (error) {
					console.error(error);
				}
			},
		);
	}, [user]);

	useEffect(() => {
		socket.on('message', (message: Message) => {
			setMessages((messages) => [...messages, message]);
		});

		socket.on('roomData', ({ users }) => {
			setUsers(users);
		});
	}, []);
	return (
		<section>
			<div className={styles['chat-box']}>
				<div className={styles['chat-header']}>
					<span>{user.name}</span>
				</div>
				<div className={styles['chat-body']}>
					{messages.map((message, idx) => {
						return (
							<Fragment key={idx}>
								{message.user === user.name ? (
									<p
										className='chat-message'
										style={
											message.user === user.name
												? { textAlign: 'end' }
												: { textAlign: 'start' }
										}
									>
										{message.text}: <span>{message.user}</span>
									</p>
								) : (
									<p
										className='chat-message'
										style={
											message.user === user.name
												? { textAlign: 'end' }
												: { textAlign: 'start' }
										}
									>
										<span>{message.user}</span>: {message.text}
									</p>
								)}
							</Fragment>
						);
					})}
				</div>
				<div className={styles['chat-footer']}>
					<span>
						<input
							type='text'
							value={userMessage}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setUserMessage(e.target.value)
							}
						/>
						<button
							className={styles['chat-button']}
							type='button'
							onClick={sendMessage}
						>
							Send
						</button>
					</span>
				</div>
			</div>
		</section>
	);
};

export default Chat;
