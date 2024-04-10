import logo from '../../../public/icons/Logo.svg'; 
import './style.css';
import { useLocation } from 'react-router-dom';

const Header = ({ isLoggedIn }) => {
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

    return (
        <div className="super-assessor-header-container">
            <header className="super-assessor-header">
                <a href='/' className="logo">
                    <img src={logo} alt="Logo"/>
                </a>
                {!isAuthPage && (
                    <nav>
                        {isLoggedIn ? (
                            <>
                                <a href="/dashboard" className="link">Dashboard</a>
                                <a href="/cards" className="link">Cards</a>
                                <a href="/users" className="link">Users</a>
                                <a href="/logout" className="link">Log out</a>
                            </>
                        ) : (
                            <>
                                <a href="/login" className="link nav-button">Login</a>
                                <a href="/signup" className="link nav-button">Sign up</a>
                            </>
                        )}
                    </nav>
                )}
            </header>
        </div>
    );
};

export default Header;