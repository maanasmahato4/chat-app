import React, { ChangeEvent, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../@types/index.spec';
import styles from './join.module.css';

interface JoinComponentProps {
	user: User;
	setUser: React.Dispatch<React.SetStateAction<User>>;
}

const Join: React.FC<JoinComponentProps> = ({
	user,
	setUser,
}): React.ReactElement => {
	const inputRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();
	function handleChange(event: ChangeEvent<HTMLInputElement>): void {
		setUser((prev) => ({ ...prev, [event.target.name]: event.target.value }));
	}
	function handleSubmit(): void {
		navigate(`/chat?name=${user.name}&room=${user.room}`);
	}

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	return (
		<section>
			<div className={styles['join-form']}>
				<input
					ref={inputRef}
					name='name'
					type='text'
					value={user.name}
					placeholder='username'
					onChange={handleChange}
				/>
				<input
					name='room'
					type='text'
					value={user.room}
					placeholder='room'
					onChange={handleChange}
				/>
				<div>
					<button
						className={styles['join-button']}
						type='button'
						onClick={handleSubmit}
					>
						Submit
					</button>
				</div>
			</div>
		</section>
	);
};

export default Join;
