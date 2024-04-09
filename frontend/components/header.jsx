import React from 'react';
import logo from '../assets/icons/Logo.svg'; 
import styles from './header.module.css';
import { useLocation } from 'react-router-dom';

const Header = ({ isLoggedIn }) => {
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

    return (
        <header className={styles['super-assessor-header']}>
            <a href='/' className={styles.logo}>
                <img src={logo} alt="Logo" />
            </a>
            {!isAuthPage && (
                <nav>
                    {isLoggedIn ? (
                        <>
                            <a href="/dashboard" className={styles.link}>Dashboard</a>
                            <a href="/cards" className={styles.link}>Cards</a>
                            <a href="/users" className={styles.link}>Users</a>
                            <a href="/logout" className={styles.link}>Log out</a>
                        </>
                    ) : (
                        <>
                            <a href="/login" className={`${styles.link} ${styles['nav-button']}`}>Login</a>
                            <a href="/signup" className={`${styles.link} ${styles['nav-button']}`}>Sign up</a>
                        </>
                    )}
                </nav>
            )}
        </header>
    );
};

export default Header;