import logo from '../../../icons/Logo.svg'; 
import './style.css';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../PrivateRoute/UserContext';

const Header = () => {
    const location = useLocation();
    const { isAuth, handleLogout } = useAuth();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
    //console.log(token);
    /*const decodedToken = (token!='null' && token) ? JSON.parse(atob(token.split('.')[1])) : ''// Decode JWT token payload
    
    console.log(userRole);*/
    const userRole = "Admin";
      const LogoutFunction = () => {
        handleLogout();
      };

if (isAuth){
    return(
        <header className="super-assessor-header">
            <div className="header-wrapper">
                <a href='/' className="logo">
                    <img src={logo} alt="Logo"/>
                </a>
                <nav>
                    <a href="/Game" className="link nav-button">Game</a>
                    {userRole=="Admin" ? (
                    <>
                    <a href="/cards" className="link nav-button">Cards</a>
                    <a href="/users" className="link nav-button">Users</a>
                    <a href="/fileupload" className="link nav-button">Upload</a>
                    </>
                    ) : (<></>)}
                    <a href="/" className="link nav-button" onClick={handleLogout}>Log out</a>
                </nav>
            </div>
        </header>
    )
}

else{
    return (
    <header className="super-assessor-header">
        <div className="header-wrapper">
            <a href='/' className="logo">
                <img src={logo} alt="Logo"/>
            </a>

            <nav>
            <a href="/login" className="link nav-button">Login</a>
            <a href="/signup" className="link nav-button">Sign up</a>
            </nav>
        </div>
    </header>   
)}
};

export default Header;