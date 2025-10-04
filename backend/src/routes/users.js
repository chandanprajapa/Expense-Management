const express = require('express');
const router = express.Router();
const db = require('../db');
const { getCurrenciesByCountryCode } = require('../utils/currency');


router.post('/register', async (req, res) => {
  try {
    const { name, email, companyName, countryCode } = req.body;

    if (!name || !email || !companyName) {
      return res.status(400).json({
        error: 'missing-fields',
        message: 'Name, email, and companyName are required',
      });
    }


    let company = (
      await db.query('SELECT * FROM companies WHERE name=$1', [companyName])
    ).rows[0];

    if (!company) {
      let currency_code = null;
      try {
        const currencies = await getCurrenciesByCountryCode(countryCode);
        if (currencies && currencies.length) {
          currency_code = currencies[0];
        }
      } catch (e) {
        console.warn('Currency detection failed for', countryCode, e.message);
      }

      company = (
        await db.query(
          'INSERT INTO companies(name, country_code, currency_code) VALUES($1,$2,$3) RETURNING *',
          [companyName, countryCode || null, currency_code]
        )
      ).rows[0];
    }

    
    const existingUser = (
      await db.query('SELECT * FROM users WHERE email=$1', [email])
    ).rows[0];

    if (existingUser) {
      return res.json({
        user: existingUser,
        company,
        message: 'User already exists, returning existing record',
      });
    }

    
    const user = (
      await db.query(
        'INSERT INTO users(name, email, company_id) VALUES($1,$2,$3) RETURNING *',
        [name, email, company.id]
      )
    ).rows[0];

    return res.json({ user, company });
  } catch (err) {
    console.error('users.register error:', err);
    res.status(500).json({
      error: 'register-failed',
      message: err.message,
    });
  }
});

module.exports = router;
