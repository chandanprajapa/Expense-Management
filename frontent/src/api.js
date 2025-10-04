const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api';

export async function get(path) {
  const r = await fetch(API_BASE + path);
  return r.json();
}

export async function post(path, body) {
  const r = await fetch(API_BASE + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return r.json();
}
