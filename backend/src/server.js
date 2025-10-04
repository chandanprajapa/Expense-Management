require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();


app.use(cors());              
app.use(helmet());            
app.use(express.json());      
app.use(morgan('dev'));      


app.use('/api/users', require('./routes/users'));
app.use('/api/expenses', require('./routes/expenses'));


app.get('/api/ping', (req, res) => res.json({ status: 'ok', pong: true }));


app.use((req, res) => {
  res.status(404).json({
    error: 'not-found',
    message: `Route ${req.originalUrl} not found`
  });
});


app.use((err, req, res, next) => {
  console.error('❌ Unhandled Error:', err);
  res.status(500).json({
    error: 'internal-server-error',
    message: err.message || 'Something went wrong'
  });
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
 
  console.log(` Backend listening on http://localhost:${PORT}`);
 
});
