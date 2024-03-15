type User = {
	id: string;
	name: string;
	room: string;
};

const users: User[] = [];

export function addUser({ id, name, room }: User): User {
	const user: User = {
		id: id,
		name: name.trim().toLowerCase(),
		room: room.trim().toLowerCase(),
	};
	users.push(user);
	return user;
}

export function deleteUser(id: string) {
	const index = users.findIndex((user) => user.id == id);
	if (index !== -1) {
		users.splice(index, 1);
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
