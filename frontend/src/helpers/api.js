const API_URL = '/api';

export async function signup(email, name, surname, department, university, position, password) {
    const response = await fetch(`${API_URL}/users/signup`, {
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
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('Authorization failed');
    }

    return response.json();
}

export async function getAllUsers(){
    const response = await fetch(`${API_URL}/users`, {
        method: 'GET',
        credentials: 'include'
    });
    if (!response.ok) {
        throw new Error('Failed to get all users');
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

export async function getTotalCards() {
    const response = await fetch(`${API_URL}/cards/total`, {
        method: 'GET'
    });
    if (!response.ok) {
        throw new Error('Failed to get total cards');
    }

    const totalCards = await response.json();
    return totalCards.toString();
}

export async function getTotalCardTypes() {
    const response = await fetch(`${API_URL}/cards/types`, {
        method: 'GET'
    });
    if (!response.ok) {
        throw new Error('Failed to get total card types');
    }

    const totalCardTypes = await response.json();
    return totalCardTypes.toString();
}

export async function getStatus(setIsAuth) {
    const response = await fetch(`${API_URL}/users/status`, {
        method: 'GET',
        credentials: 'include'
    });

    if (!response.ok) {
        const newToken = await refreshToken();
        if (newToken) {
            return getStatus(setIsAuth);
        } else {
            setIsAuth(false);
            throw new Error('Token refresh failed');
        }
    }
    setIsAuth(true);
    return response.json();
}

export async function refreshToken() {
    const response = await fetch(`${API_URL}/users/token`, {
        method: 'GET',
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Token refresh failed');
    }
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

export async function getAllSchemes() {
    const response = await fetch(`${API_URL}/assscheme`, {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error('Failed to get all schemes');
    }

    return response.json();
}

export async function getAvgRating(id) {
    const response = await fetch(`${API_URL}/ratings/avg/${id}`, {
        method: 'GET'
    });
    if (!response.ok) {
        return null; // Return null if the rating is not found
    }

    return response.json();
}

export async function getUserName(id) {
    const response = await fetch(`${API_URL}/users/name/${id}`, {
        method: 'GET'
    });
    if (!response.ok) {
        throw new Error('Failed to get user name');
    }

    return response.json();
}

export async function getSingleCard(id) {
    const response = await fetch(`${API_URL}/cards/${id}`, {
        method: 'GET'
    });
    if (!response.ok) {
        throw new Error('Failed to get card details');
    }

    return response.json();
}

export async function rateScheme(score, scheme) {
    const response = await fetch(`${API_URL}/ratings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score, scheme }),
    });

    if (!response.ok) {
        throw new Error('Failed to rate scheme');
    }

    return response.json();
}

export async function isRated(scheme) {
    const response = await fetch(`${API_URL}/ratings/rated/${scheme}`, {
        method: 'GET'
    });

    if (!response.ok) {
        return false; // Return false if the rating is not found
    }

    return response.json();
}

export async function deleteScheme(id) {
    const response = await fetch(`${API_URL}/assscheme/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Failed to delete scheme');
    }

    return response.json();
}