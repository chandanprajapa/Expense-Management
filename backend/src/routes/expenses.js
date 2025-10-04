const express = require('express');
const router = express.Router();
const db = require('../db');
const { convertCurrency } = require('../utils/currency');


router.post('/', async (req, res) => {
  try {
    const { email, original_currency, original_amount, category, description, date_of_expense } = req.body;

    if (!email || !original_currency || !original_amount) {
      return res.status(400).json({
        error: 'missing-fields',
        message: 'email, original_currency and original_amount are required'
      });
    }

    
    const uRes = await db.query('SELECT * FROM users WHERE email=$1', [email]);
    if (!uRes.rows.length) {
      return res.status(404).json({ error: 'user-not-found', message: 'No user found for given email' });
    }
    const user = uRes.rows[0];

    
    const compRes = await db.query('SELECT * FROM companies WHERE id=$1', [user.company_id]);
    if (!compRes.rows.length) {
      return res.status(400).json({ error: 'company-not-found', message: 'User is not linked to a valid company' });
    }
    const company = compRes.rows[0];

    let companyCurrency = company.currency_code || original_currency.toUpperCase();

   
    if (!company.currency_code) {
      await db.query('UPDATE companies SET currency_code=$1 WHERE id=$2', [companyCurrency, company.id]);
      company.currency_code = companyCurrency;
    }

    let converted = null;
    try {
      converted = await convertCurrency(
        original_currency.toUpperCase(),
        companyCurrency.toUpperCase(),
        original_amount
      );
      converted = Math.round(converted * 100) / 100; 
    } catch (err) {
      console.warn(`Currency conversion failed from ${original_currency} to ${companyCurrency}:`, err.message);
    
    }

    
    const insert = await db.query(
      `INSERT INTO expenses(
        company_id, user_id, original_currency, original_amount,
        amount_in_company_currency, category, description, date_of_expense, status
      ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [
        company.id,
        user.id,
        original_currency.toUpperCase(),
        original_amount,
        converted,
        category || null,
        description || null,
        date_of_expense || null,
        'PENDING'
      ]
    );

    res.json({
      message: 'Expense created successfully',
      expense: insert.rows[0],
      company,
      user
    });
  } catch (err) {
    console.error('expenses.create error:', err);
    res.status(500).json({ error: 'create-expense-failed', message: err.message });
  }
});


router.get('/:email', async (req, res) => {
  try {
    const { email } = req.params;

  
    const uRes = await db.query('SELECT * FROM users WHERE email=$1', [email]);
    if (!uRes.rows.length) {
      return res.status(404).json({ error: 'user-not-found', message: 'No user found for given email' });
    }
    const user = uRes.rows[0];

    const ex = await db.query(
      'SELECT * FROM expenses WHERE company_id=$1 ORDER BY created_at DESC',
      [user.company_id]
    );

    res.json({
      message: `Found ${ex.rows.length} expenses for company ${user.company_id}`,
      expenses: ex.rows
    });
  } catch (err) {
    console.error('expenses.list error:', err);
    res.status(500).json({ error: 'list-expenses-failed', message: err.message });
  }
});

module.exports = router;
