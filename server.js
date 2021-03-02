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
	res.json({ msg: 'Welcome to the sharestuff backend api' });
});

// define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/offers', require('./routes/offers'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/chats', require('./routes/chats'));

// start server on PORT
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
