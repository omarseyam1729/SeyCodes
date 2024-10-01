// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const pageRoutes = require('./routes/pageRoutes');
const authRoutes = require('./routes/authRoutes');
const problemRoutes = require('./routes/problemRoutes');
const discussionRoutes=require('./routes/discussionRoutes');
const PORT=443;
const sequelize = require('./config/connection');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(pageRoutes);
app.use(authRoutes);
app.use(discussionRoutes);
app.use(problemRoutes);
app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT,()=>{"Server is running"});

