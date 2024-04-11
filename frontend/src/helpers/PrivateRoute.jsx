import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './../UserContext.jsx';
// This component checks if the user is authenticated and has the required role to access a route. If the user is authenticated and has the required role, it renders the route's content. Otherwise, it redirects the user to the login page.
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