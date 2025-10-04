import React, { useState } from 'react';
import { post } from '../api';

export default function SubmitExpense(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [amount, setAmount] = useState('100.00');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  async function registerUserIfNeeded() {
    if (!name || !email || !company) return null;
  
    const res = await post('/users/register', { name, email, companyName: company, countryCode });
    return res;
  }

  async function submitExpense(e) {
    e.preventDefault();
    setMessage('Working...');
    try {
      await registerUserIfNeeded();
      const res = await post('/expenses', {
        email,
        original_currency: currency,
        original_amount: amount,
        category,
        description
      });
      if (res.error) setMessage('Error: ' + (res.message || res.error));
      else setMessage('Expense created (id ' + res.expense.id + ') — converted: ' + (res.expense.amount_in_company_currency ?? 'N/A'));
    } catch (err) {
      console.error(err);
      setMessage('Failed: ' + err.message);
    }
  }

  return (
    <div>
      <h3>Submit Expense</h3>
      <form onSubmit={submitExpense}>
        <div><strong>Create / ensure user (before submit):</strong></div>
        <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} style={{width:'100%'}} /><br/>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%'}} /><br/>
        <input placeholder="Company name" value={company} onChange={e=>setCompany(e.target.value)} style={{width:'100%'}} /><br/>
        <input placeholder="Company country code (e.g. IN, US) — optional" value={countryCode} onChange={e=>setCountryCode(e.target.value)} style={{width:'100%'}} /><br/>
        <hr/>
        <div><strong>Expense details</strong></div>
        <input placeholder="Currency (e.g. USD)" value={currency} onChange={e=>setCurrency(e.target.value)} /><br/>
        <input placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} /><br/>
        <input placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} /><br/>
        <input placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} /><br/>
        <div style={{ marginTop: 8 }}>
          <button type="submit">Create / Submit Expense</button>
        </div>
      </form>
      {message && <div style={{ marginTop:8 }}>{message}</div>}
      <p style={{ color:'#666' }}>Tip: first create a Account</p>
    </div>
  );
}
