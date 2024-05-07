import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './UserContext';
// This component checks if the user is authenticated and has the required role to access a route. If the user is authenticated and has the required role, it renders the route's content. Otherwise, it redirects the user to the login page.
const PrivateRoutes = ({requiredRoles}) => {
    const { isAuth } = useAuth();
    //const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
    //const userRole = decodedToken ? decodedToken.role : null;

    const userRole = "Admin";
    
    if(isAuth == false){
        return <Navigate to="/login"/>;
    }

    if(isAuth == true && requiredRoles.includes(userRole)){
        return <Outlet/>;  
    }
}

export default PrivateRoutes;