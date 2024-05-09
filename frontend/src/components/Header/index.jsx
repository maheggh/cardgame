import logo from '../../../icons/Logo.svg'; 
import './style.css';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../PrivateRoute/UserContext';

const Header = () => {
    const location = useLocation();
    const { isAuth, handleLogout, role } = useAuth();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
    //console.log(token);
    /*const decodedToken = (token!='null' && token) ? JSON.parse(atob(token.split('.')[1])) : ''// Decode JWT token payload
    
    console.log(userRole);*/
    const userRole = role;
      const LogoutFunction = () => {
        handleLogout();
      };

if (isAuth){
    return(
        <header className="super-assessor-header">
            <div className="header-wrapper">
                <Link  to='/' className="logo">
                    <img src={logo} alt="Logo"/>
                </Link >
                <nav>
                    <Link  to="/Game" className="link nav-button">Game</Link>
                    {userRole=="Admin" ? (
                    <>
                    <Link  to="/cards" className="link nav-button">Cards</Link >
                    <Link  to="/users" className="link nav-button">Users</Link >
                    <Link  to="/fileupload" className="link nav-button">Upload</Link >
                    </>
                    ) : (<></>)}
                    <a  href="/" className="link nav-button" onClick={handleLogout}>Log out</a>
                </nav>
            </div>
        </header>
    )
}

else{
    return (
    <header className="super-assessor-header">
        <div className="header-wrapper">
            <Link to='/' className="logo">
                <img src={logo} alt="Logo"/>
            </Link>

            <nav>
            <Link to="/login" className="link nav-button">Login</Link>
            <Link to="/signup" className="link nav-button">Sign up</Link>
            </nav>
        </div>
    </header>   
)}
};

export default Header;