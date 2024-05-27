import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './UserContext';
// This component checks if the user is authenticated and has the required role to access a route. If the user is authenticated and has the required role, it renders the route's content. Otherwise, it redirects the user to the login page.
const PrivateRoutes = ({requiredRoles}) => {
    const { isAuth, role } = useAuth();
    const userRole = role;
    if(isAuth == false){
        return <Navigate to="/login"/>;
    }

    if(isAuth == true && requiredRoles.includes(userRole) && userRole !== ""){
        return <Outlet/>;  
    }

    if(isAuth == true && !requiredRoles.includes(userRole) && userRole !== ""){
        return <Navigate to="/"/>; 
    }

}

export default PrivateRoutes;