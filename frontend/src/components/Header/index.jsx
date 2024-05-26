import logo from '../../../icons/Logo.svg';
import { useState } from 'react';
import './style.css';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../PrivateRoute/UserContext';

const Header = () => {
    const location = useLocation();
    const { isAuth, role, handleLogout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
    const userRole = role;
      const LogoutFunction = () => {
        handleLogout();
      };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

if (isAuth){
    return(
        <header className="super-assessor-header">
            <div className="header-wrapper">
                <Link  to='/' className="logo" >
                    <img src={logo} alt="Logo"/>
                </Link >
                <nav className={`${isOpen ? 'open' : ''}`}>
                    <Link  to="/game" className="link nav-button" onClick={closeMenu}>Game</Link>
                    <Link  to="/schemes" className="link nav-button" onClick={closeMenu}>Schemes</Link>
                    {userRole=="Admin" ? (
                    <>
                    <Link  to="/cards" className="link nav-button" onClick={closeMenu}>Cards</Link >
                    <Link  to="/users" className="link nav-button" onClick={closeMenu}>Users</Link >
                    <Link  to="/fileupload" className="link nav-button" onClick={closeMenu}>Upload</Link >
                    </>
                    ) : (<></>)}
                    <Link  to="/account" className="link nav-button" onClick={closeMenu}>Account</Link>
                    <a  href="/" className="link nav-button" onClick={handleLogout} >Log out</a>
                </nav>
              <div className="menu-icon" onClick={toggleMenu}>
              {isOpen ? <i className="fa-solid fa-xmark"/> : <i className="fa-solid fa-bars"/> }
              </div>
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

             <nav className={`${isOpen ? 'open' : ''}`}>
            <Link to="/login" className="link nav-button" onClick={closeMenu}>Login</Link>
            <Link to="/signup" className="link nav-button" onClick={closeMenu}>Sign up</Link>
            </nav>
              <div className="menu-icon" onClick={toggleMenu}>
              {isOpen ? <i className="fa-solid fa-xmark"/> : <i className="fa-solid fa-bars"/> }
              </div>
        </div>
    </header>   
)}
};

export default Header;