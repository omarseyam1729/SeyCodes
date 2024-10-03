// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const pageRoutes = require('./routes/pageRoutes');
const authRoutes = require('./routes/authRoutes');
const problemRoutes = require('./routes/problemRoutes');
const discussionRoutes = require('./routes/discussionRoutes');
const sequelize = require('./config/connection');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Define your routes
app.use(pageRoutes);
app.use(authRoutes);
app.use(discussionRoutes);
app.use(problemRoutes);

module.exports = app; // Export the app
