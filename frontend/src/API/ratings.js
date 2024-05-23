const API_URL = '/api';

export async function getAvgRating(id) {
    const response = await fetch(`${API_URL}/ratings/avg/${id}`, {
        method: 'GET',
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Failed to get average rating');
    }

    return response.json();
}

export async function rateScheme(score, scheme) {
    const response = await fetch(`${API_URL}/ratings/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score, scheme }),
    });

    if (!response.ok) {
        throw new Error('Failed to get total schemes');
    }

    return response.json();
}

export async function isRated(scheme) {
    const response = await fetch(`${API_URL}/ratings/rated/${scheme}`, {
        method: 'GET',
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Rating not found');
    }

    return response.json();
}

export async function createRating(score, scheme) {
    const response = await fetch(`${API_URL}/ratings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include',
        body: JSON.stringify({ score, scheme })
    });

    if (!response.ok) {
        throw new Error('Failed to create rating');
    }

    return response.json();
}