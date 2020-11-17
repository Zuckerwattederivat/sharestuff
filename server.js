/**
 * Backend Server Setup JS
 */

// variables
const PORT = process.env.PORT || 5000;
const express = require('express');
const app = express();
const connectDB = require('./config/db');

// connect database
connectDB();

// init middleware
app.use(express.json({ extended: false }));
app.use('/public', express.static('public'));

// response to get request
app.get('/', (req, res) => {
	res.json({ msg: 'Welcome to the sharestuff backend server' });
});

// define routes
app.use('/server/users', require('./routes/users'));
app.use('/server/auth', require('./routes/auth'));
app.use('/server/categories', require('./routes/categories'));
app.use('/server/offers', require('./routes/offers'));

// start server on PORT
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
