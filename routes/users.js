const express = require('express'),
	userRouter = express.Router();
const passport = require('passport'),
	passportConfig = require('./../passport');
const JWT = require('jsonwebtoken');
const User = require('./../models/User');
// const secretOrKey = require('./../config/secretOrKey');

const secretOrKey = 'Ninja';

const signToken = (userID) => {
	return JWT.sign(
		{
			iss: 'myExpense',
			sub: userID,
		},
		secretOrKey,
		{ expiresIn: '1h' }
	);
};

userRouter.post('/register', (request, response) => {
	const { username, password, email, name } = request.body;
	User.findOne({ username }, (error, user) => {
		if (error)
			response.status(500).json({
				message: {
					messageBody: 'Encountered an error 😵1',
					messageError: true,
				},
			});
		if (user)
			response.status(400).json({
				message: {
					messageBody: 'Username is already taken 🤔',
					messageError: true,
				},
			});
		else {
			const newUser = new User({ username, password, email, name });
			newUser.save((error) => {
				if (error)
					response.status(500).json({
						message: {
							messageBody: 'Encountered an error 😵',
							messageError: true,
						},
					});
				else {
					response.status(201).json({
						message: {
							messageBody: 'Account successfully created 🥳',
							messageError: false,
						},
					});
				}
			});
		}
	});
});

userRouter.post(
	'/login',
	passport.authenticate('local', { session: false }),
	(request, response) => {
		if (request.isAuthenticated()) {
			const { _id, username, name, email, setBudget } = request.user;
			const token = signToken(_id);
			response.cookie('access_token', token, {
				httpOnly: true,
				sameSite: true,
			});
			response.status(200).json({
				isAuthenticated: true,
				user: { _id, username, name, email, setBudget },
			});
		}
	}
);

userRouter.get(
	'/logout',
	passport.authenticate('jwt', { session: false }),
	(request, response) => {
		response.clearCookie('access_token');
		response.json({ user: { username: '' }, success: true });
	}
);

userRouter.get(
	'/authenticated',
	passport.authenticate('jwt', { session: false }),
	(request, response) => {
		const username = request.user;
		response.status(200).json({ isAuthenticated: true, user: { username } });
	}
);

module.exports = userRouter;
