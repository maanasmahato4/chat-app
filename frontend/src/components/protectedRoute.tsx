import React from 'react';
import { Navigate } from 'react-router-dom';
import { User } from '../@types/index.spec';

interface ProtectedRouteComponentProps {
	user: User;
	children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteComponentProps> = ({
	user,
	children,
}) => {
	const validateUser =
		user.name.length > 0 && user.room.length > 0 ? true : false;
	return validateUser ? children : <Navigate to='/' />;
};

export default ProtectedRoute;
