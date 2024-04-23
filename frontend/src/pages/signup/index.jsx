import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {login, signup} from '../../api/api.js';

function Signup() {
    // State for form inputs
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [department, setDepartment] = useState('');
    const [university, setUniversity] = useState('');
    const [position, setPosition] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    // Signup function
    const signup = async (email, password, name, surname, department, university, position) => {
        const requestBody = { email, password, name, surname, department, university, position };

        // Send signup request
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        // Throw error if signup fails
        if (!response.ok) {
            const responseBody = await response.text();
            console.error('Server response:', responseBody);
            throw new Error(`Signup failed: ${response.statusText}`);
        }

        return response.json();
    };


    // Handle signup form
    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const response = await signup(email, password, name, surname, department, university, position);
            const loginRes = await login(email, password);
            localStorage.setItem('user', JSON.stringify(loginRes.accessToken));
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
                            autocomplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            autocomplete="given-name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label>
                        Surname:
                        <input
                            type="text"
                            value={surname}
                            autocomplete="family-name"
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
                            autocomplete="off"
                            onChange={(e) => setUniversity(e.target.value)}
                        />
                    </label>
                    <label>
                        Position:
                        <select
                            value={position}
                            autocomplete="off"
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
                            autocomplete="new-password"
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