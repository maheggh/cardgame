import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './../UserContext.jsx';

const PrivateRoutes = ({requiredRoles}) => {
	console.log(requiredRoles);
	const { token } = useAuth();
	const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
	const userRole = decodedToken ? decodedToken.role : null;
	
	return(
		(token != null && token != 'null' && requiredRoles.includes(userRole)) ? <Outlet/> : <Navigate to="/login"/>
	)
}

export default PrivateRoutes;