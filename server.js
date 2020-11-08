/**
 * Backend Server Setup JS
 */

// variables
const PORT = process.env.PORT || 5000;
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// connect database
connectDB();

// init middleware
app.use(express.json({ extended: false }));

// response to get request
app.get('/', (req, res) => res.json({ msg: 'Welcome to the sharestuff API...' }));

// define routes
app.use('/server/users', require('./routes/users'));
app.use('/server/auth', require('./routes/auth'));

// start server on PORT
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
