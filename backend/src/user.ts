interface User {
	id: string;
	name: string;
	room: string;
}

interface userRetrun {
	user?: User;
	error?: string;
}

const users: User[] = [];

export function addUser({ id, name, room }: User): userRetrun {
	const newUser: User = {
		id: id,
		name: name.trim().toLowerCase(),
		room: room.trim().toLowerCase(),
	};
	const userExist = users.find(
		(user) => user.name == newUser.name && user.room == newUser.room,
	);
	if (!userExist) {
		return { error: 'user already exists' };
	}
	users.push(newUser);
	return { user: newUser };
}

export function deleteUser(id: string): User | undefined {
	const index = users.findIndex((user) => user.id == id);
	if (index !== -1) {
		return users.splice(index, 1)[0];
	}
}

export function getUser(id: string): User | null {
	const user = users.find((user) => user.id == id);
	if (!user) {
		return null;
	}
	return user;
}

export function getUsersInARoom(room: string): User[] {
	const users_in_the_room = users.filter((user) => user.room === room);
	return users_in_the_room;
}
