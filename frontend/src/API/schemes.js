const API_URL = '/api';

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

export async function createScheme(data) {
    const response = await fetch(`${API_URL}/assscheme/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Failed to submit card setup');
    }

    return response.json();
}