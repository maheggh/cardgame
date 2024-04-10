import React, { useState } from 'react';
import './style.css';
import { login } from '../../api/api.js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../UserContext.jsx';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginAuth } = useAuth();
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const data = await login(email, password); 
            loginAuth(JSON.stringify(data.accessToken));
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your email and password and try again.');
        }
    };

    return (
        <main className="loginscreen">
            <div className="loginscreen_content">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <label>
                        Email:
                        <input type="email" value={email} onChange={handleEmailChange} />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input type="password" value={password} onChange={handlePasswordChange} />
                    </label>
                    <br />
                    <button type="submit">Login</button>
                </form>
                <a href="/signup" className="loginscreen_content_already"><span>New to SUPER ASSESSOR?</span></a>
            </div>
        </main>
    );
}

export default Login;