-- Companies
CREATE TABLE IF NOT EXISTS companies (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  country_code TEXT,
  currency_code TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT now()
);

-- Expenses
CREATE TABLE IF NOT EXISTS expenses (
  id SERIAL PRIMARY KEY,
  company_id INTEGER REFERENCES companies(id),
  user_id INTEGER REFERENCES users(id),
  original_currency TEXT,
  original_amount NUMERIC(12,2),
  amount_in_company_currency NUMERIC(12,2),
  category TEXT,
  description TEXT,
  date_of_expense DATE,
  status TEXT DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT now()
);
