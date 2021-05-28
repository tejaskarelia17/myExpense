const express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	path = require('path'),
	cors = require('cors'),
	cookieParser = require('cookie-parser');

// require('dotenv').config();

const app = express();
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '/client/build/index.html'));
	// resizeBy.send('welcome to my form');
});

const mongoUri = process.env.MONGO_URI;
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json());

//Routes
const userRoute = require('./routes/users');
app.use('/api/user', userRoute);
const transactionRoute = require('./routes/transaction');
app.use('/api/transaction', transactionRoute);
const groupRoute = require('./routes/group');
app.use('/api/group', groupRoute);
const dashboardRoute = require('./routes/dashboard');
app.use('/api/dashboard', dashboardRoute);

mongoose.connect(
	mongoUri,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => {
		console.log('Connected to MongoDB database.');
	}
);

app.listen(PORT, () => {
	console.log(process.env.MONGO_URI);
	console.log('Server 🔥fired up on port 👉', PORT);
});
