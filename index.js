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
// const transactionRoute = require('./routes/transaction');
// app.use('/transaction', transactionRoute);
// const groupRoute = require('./routes/group');
// app.use('/group', groupRoute);
// const dashboardRoute = require('./routes/dashboard');
// app.use('/dashboard', dashboardRoute);

mongoose.connect(
	mongoUri,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => {
		console.log('Connected to MongoDB database.');
	}
);

app.listen(PORT, () => {
	console.log('Server started 🔥 on port 👉', PORT);
});
