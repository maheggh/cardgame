import logo from '../../../public/icons/Logo.svg'; 
import './style.css';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../UserContext.jsx';

const Header = () => {
    const location = useLocation();
    const { token, handleLogout } = useAuth();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
    const decodedToken = (token!='null' && token) ? JSON.parse(atob(token.split('.')[1])) : ''// Decode JWT token payload
    const userRole = decodedToken.role;
      const LogoutFunction = () => {
        handleLogout();
      };

    return (
        <header className="super-assessor-header">
        <div className="header-wrapper">
            <a href='/' className="logo">
                <img src={logo} alt="Logo"/>
            </a>
            {!isAuthPage && (
                <nav>
                    {(userRole=="User" || userRole=="Admin")  ? (
                        <>
                            <a href="/dashboard" className="link nav-button">Dashboard</a>
                            <a href="/Game" className="link nav-button">Game</a>
                            {userRole=="Admin" ? (
                                <>
                                <a href="/cards" className="link nav-button">Cards</a>
                                <a href="/users" className="link nav-button">Users</a>
                                <a href="/fileupload" className="link nav-button">Upload</a>
                                </>
                                ) : (<></>)}
                            <a href="/" className="link nav-button" onClick={handleLogout}>Log out</a>
                        </>
                    ) : (
                        <>
                            <a href="/login" className="link nav-button">Login</a>
                            <a href="/signup" className="link nav-button">Sign up</a>
                        </>
                    )}
                </nav>
            )}
        </div>
        </header>
    );
};

export default Header;