const express = require('express'),
	mongoose = require('mongoose'),
	cookieParser = require('cookie-parser');

const mongoUri = require('./config/db');
const PORT = 5000;
const app = express();

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
	console.log('Server 🔥fired up on port 👉', PORT);
});
