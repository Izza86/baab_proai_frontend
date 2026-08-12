const API_URL = 'http://localhost:8000/api/v1/items';

export async function fetchItems(token: string) {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch items');
  return res.json();
}

export async function createItem(token: string, item: { title: string; description?: string; status?: string; priority?: number }) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Failed to create item');
  return res.json();
}

export async function updateItem(token: string, itemId: string, updates: { status?: string }) {
  const res = await fetch(`${API_URL}/${itemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update item');
  return res.json();
}

export async function deleteItem(token: string, itemId: string) {
  const res = await fetch(`${API_URL}/${itemId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete item');
}