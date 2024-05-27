const API_URL = '/api';

export async function bookmark(id) {
    const response = await fetch(`${API_URL}/bookmarks/${id}`, {
        method: 'POST',
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Failed to bookmark');
    }
    if (response.status === 204) {
      return;
    }
    return response.json();
}

export async function getBookmark(id) {
    const response = await fetch(`${API_URL}/bookmarks/${id}`, {
        method: 'GET',
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Failed to get bookmark');
    }

    return response.json();
}

export async function unBookmark(id) {
    const response = await fetch(`${API_URL}/bookmarks/${id}`, {
        method: 'DELETE',
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Bookmark not found');
    }

    return response.json();
}

export async function getAllUserBookmarks() {
    const response = await fetch(`${API_URL}/bookmarks/`, {
        method: 'GET',
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Bookmark not found');
    }

    return response.json();
}

export async function Bookmarked(id) {
    const response = await fetch(`${API_URL}/bookmarks/bookmarked/${id}`, {
        method: 'GET',
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Bookmark not found');
    }

    return response.json();
}
