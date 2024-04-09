import React, { useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [department, setDepartment] = useState('');
    const [university, setUniversity] = useState('');
    const [position, setPosition] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const signup = async (email, password, name, surname, department, university, position) => {
        const requestBody = { email, password, name, surname, department, university, position };
        console.log('Request body:', requestBody);

        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const responseBody = await response.text();
            console.error('Server response:', responseBody);
            throw new Error(`Signup failed: ${response.statusText}`);
        }

        return response.json();
    };

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const response = await signup(email, password, name, surname, department, university, position);
            console.log(response);
            const { accessToken, refreshToken, user } = response;
            console.log('User:', user);
            console.log('Access Token:', accessToken);
            console.log('Refresh Token:', refreshToken);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/');
        } catch (error) {
            console.error('Signup failed:', error);
            alert('Signup failed. Please check your details and try again.');
        }
    };

    return (
        <main className="signupscreen">
            <div className="signupscreen_content">
                <h1>Sign up</h1>
                <form onSubmit={handleSignup}>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label>
                        Surname:
                        <input
                            type="text"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </label>
                    <label>
                        Department:
                        <input
                            type="text"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        />
                    </label>
                    <label>
                        University:
                        <input
                            type="text"
                            value={university}
                            onChange={(e) => setUniversity(e.target.value)}
                        />
                    </label>
                    <label>
                        Position:
                        <select
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                        >
                            <option value="">Select...</option>
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="teacher assistant">Teacher Assistant</option>
                        </select>
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <button type="submit">Signup</button>
                </form>
                <a href="/login" className="signupscreen_content_already"><span>Already have an account?</span></a>
            </div>
        </main>
    );
}

export default Signup;