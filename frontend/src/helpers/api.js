const API_URL = '/api';

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
    const response = await fetch(`${API_URL}/cards`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'auth-token': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Login failed');
    }

    return response.json();
}


export async function usersAuthorize(token){
    token = token.replace(/"/g, ''); 
    const response = await fetch(`${API_URL}/users`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'auth-token': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Login failed');
    }

    return response.json();
}


export async function getTotalTeachers() {
    const response = await fetch(`${API_URL}/users/total`, {
        method: 'GET'
    });
    if (!response.ok) {
        throw new Error('Failed to get total users');
    }

    const totalTeachers = await response.json();
    return totalTeachers.toString();
}

export async function getStatus(setIsAuth) {
    const response = await fetch(`${API_URL}/users/status`, {
        method: 'GET',
        credentials: 'include'
    });

    if (!response.ok) {
        setIsAuth(false);
        throw new Error('Status failed');
    }
    setIsAuth(true);
    return response.json();
}

export async function logout(){
    const response = await fetch(`${API_URL}/users/logout`, {
        method: 'GET',
        credentials: 'include'
    });
    if (!response.ok) {
        throw new Error('Logout failed');
    }

    return response.json();
}