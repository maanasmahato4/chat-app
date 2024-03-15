import React, { ChangeEvent } from 'react';
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
	const navigate = useNavigate();
	function handleChange(event: ChangeEvent<HTMLInputElement>): void {
		setUser((prev) => ({ ...prev, [event.target.name]: event.target.value }));
	}
	function handleSubmit(): void {
		navigate(`/chat?name=${user.name}&room=${user.room}`);
	}
	return (
		<div className={styles['join-form']}>
			<label title='Username'>
				<input
					name='name'
					type='text'
					value={user.name}
					placeholder='eg: johndoe'
					onChange={handleChange}
				/>
			</label>
			<label title='Room'>
				<input
					name='room'
					type='text'
					value={user.room}
					placeholder='eg: school'
					onChange={handleChange}
				/>
			</label>
			<button type='button' onClick={handleSubmit}>
				Submit
			</button>
		</div>
	);
};

export default Join;
