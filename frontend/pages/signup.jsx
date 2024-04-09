import React, { useState } from 'react';
import styles from './login.module.css';

function Signup() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [department, setDepartment] = useState('');
    const [university, setUniversity] = useState('');
    const [position, setPosition] = useState('');
    const [password, setPassword] = useState('');

const handleSignup = async (event) => {
    event.preventDefault();

    try {
        const response = await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                name,
                surname,
                department,
                university,
                position,
                password,
            }),
        });

        if (!response.ok) {
            throw new Error('Signup failed');
        }

        const data = await response.json();
        console.log('Signup successful:', data);

        // Store the JWT in localStorage
        localStorage.setItem('token', data.token);

        // Here you might want to redirect the user to the login page or directly log them in
    } catch (error) {
        console.error('Signup failed:', error);
    }
};

    return (
        <main className={styles.signupscreen}>
            <div className={styles.signupscreen_content}>
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
                <a href="/login" className={styles.signupscreen_content_already}><span>Already have an account?</span></a>
            </div>
        </main>
    );
}

export default Signup;