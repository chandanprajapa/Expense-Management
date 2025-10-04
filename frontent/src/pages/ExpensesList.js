import React, { useState } from 'react';
import { get } from '../api';

export default function ExpensesList(){
  const [email, setEmail] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [message, setMessage] = useState('');

  async function load() {
    if (!email) { setMessage('Enter user email'); return; }
    setMessage('Loading...');
    try {
      const res = await get('/expenses/' + encodeURIComponent(email));
      if (res.error) setMessage('Error: ' + (res.message || res.error));
      else {
        setExpenses(res);
        setMessage('');
      }
    } catch (err) {
      setMessage('Failed: ' + err.message);
    }
  }

  return (
    <div>
      <h3>Expenses List (by user email)</h3>
      <input placeholder="User email" value={email} onChange={e=>setEmail(e.target.value)} />
      <button onClick={load}>Load</button>
      {message && <div>{message}</div>}
      <ul>
        {expenses.map(e => (
          <li key={e.id}>
            #{e.id} — {e.original_amount} {e.original_currency} → {e.amount_in_company_currency ?? 'N/A'} | {e.category || '-'} | {new Date(e.created_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
