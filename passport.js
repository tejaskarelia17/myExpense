const passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	JwtStrategy = require('passport-jwt').Strategy;
require('dotenv').config();
const User = require('./models/User');
// const secretOrKey = require('./config/secretOrKey');
const secretOrKey = process.env.SECRET_OR_KEY;

if (process.env.NODE_ENV === 'production') {
	const secretOrKey = process.env.SECRET_OR_KEY;
}

const cookieExtractor = (request) => {
	let token = null;
	if (request && request.cookies) {
		token = request.cookies['access_token'];
	}
	return token;
};

passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: cookieExtractor,
			secretOrKey,
		},
		(payload, done) => {
			User.findById({ _id: payload.sub }, (error, user) => {
				if (error) return done(error, false);
				if (user) return done(null, user);
				else return done(null, false);
			});
		}
	)
);

passport.use(
	new LocalStrategy((username, password, done) => {
		User.findOne({ username }, (error, user) => {
			if (error) return done(error);
			if (!user) return done(null, false);
			user.comparePassword(password, done);
		});
	})
);
