import logo from '../../../public/icons/Logo.svg'; 
import './style.css';
import { useLocation } from 'react-router-dom';

const Header = ({ isLoggedIn }) => {
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

    return (
        <header className="super-assessor-header">
        <div className="header-wrapper">
            <a href='/' className="logo">
                <img src={logo} alt="Logo"/>
            </a>
            {!isAuthPage && (
                <nav>
                    {isLoggedIn ? (
                        <>
                            <a href="/dashboard" className="link nav-button">Dashboard</a>
                            <a href="/cards" className="link nav-button">Cards</a>
                            <a href="/users" className="link nav-button">Users</a>
                            <a href="/logout" className="link nav-button">Log out</a>
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