import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Join from './pages/join/join';
import { User } from './@types/index.spec';
import ProtectedRoute from './components/protectedRoute';
import Chat from './pages/chat/chat';

function App() {
	const [user, setUser] = useState<User>({ name: '', room: '' });
	console.log(user);
	return (
		<Routes>
			<Route index element={<Join user={user} setUser={setUser} />} />

			<Route
				path={`/chat/*`}
				element={
					<ProtectedRoute user={user}>
						<Chat user={user} />
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
}

export default App;
