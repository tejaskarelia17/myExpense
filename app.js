/**
 * Created by tejaskarelia on 11/15/17.
 */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//MongoDB Connect
mongoose.connect(config.database);

//Successful DB Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB database: '+config.database);
});

//Error on DB Connection
mongoose.connection.on('error', (err) => {
    console.log('Database error: '+err);
});

//Initialize Express
const app = express();

//Routes
const users = require('./routes/users');
const transactions = require('./routes/transactions');
const groups = require('./routes/groups');

//Port Number for server
const port = 3000;

//CORS Middleware
app.use(cors());

//Frontend Files
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//Index Route
app.get('/', (req, res) => {
   res.send('Invalid Endpoint');
});

//Express Routing
app.use('/users', users);
app.use('/transactions', transactions);
app.use('/groups', groups);

//Starting Server
app.listen(port, () => {
    console.log('Server started on port '+port);
});