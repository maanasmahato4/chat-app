import React from 'react';
import { Navigate } from 'react-router-dom';
import { User } from '../@types/index.spec';

interface ProtectedRouteComponentProps {
	user: User | null;
	children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteComponentProps> = ({
	user,
	children,
}) => {
	return user ? children : <Navigate to='/' />;
};

export default ProtectedRoute;
