import logo from '../../../icons/Logo.svg'; 
import './style.css';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../PrivateRoute/UserContext';

const Header = () => {
    const location = useLocation();
    const { isAuth, role, handleLogout } = useAuth();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
    const userRole = role;
      const LogoutFunction = () => {
        handleLogout();
      };

if (isAuth){
    return(
        <header className="super-assessor-header">
            <div className="header-wrapper">
                <Link  to='/' className="logo" >
                    <img src={logo} alt="Logo"/>
                </Link >
                <nav>
                    <Link  to="/game" className="link nav-button" >Game</Link>
                    <Link  to="/schemes" className="link nav-button" >Schemes</Link>
                    {userRole=="Admin" ? (
                    <>
                    <Link  to="/cards" className="link nav-button" >Cards</Link >
                    <Link  to="/users" className="link nav-button" >Users</Link >
                    <Link  to="/fileupload" className="link nav-button" >Upload</Link >
                    </>
                    ) : (<></>)}
                    <Link  to="/account" className="link nav-button" >Account</Link>
                    <a  href="/" className="link nav-button" onClick={handleLogout} >Log out</a>
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
            <Link to="/login" className="link nav-button" >Login</Link>
            <Link to="/signup" className="link nav-button" >Sign up</Link>
            </nav>
        </div>
    </header>   
)}
};

export default Header;