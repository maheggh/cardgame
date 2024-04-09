const API_URL = 'http://localhost:3000';

export async function signup(email, name, surname, department, university, position, password) {
    const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, surname, department, university, position, password }),
    });

    if (!response.ok) {
        throw new Error('Signup failed');
    }

    return response.json();
}

export async function login(email, password) {
    const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return response.json();
}

export async function authorize(token){
    console.log(token);
    const response = await fetch(`${API_URL}/cards`, {
        method: 'GET',
        headers: {
            'auth-token': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Login failed');
    }

    return response.json();
}