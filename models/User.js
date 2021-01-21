const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//User Schema
const UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		min: 4,
		max: 15,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	setBudget: {
		type: Number,
		default: 100,
	},
	userProfilePic: {
		type: String,
	},
	password: {
		type: String,
		required: true,
	},
});

UserSchema.pre('save', function (next) {
	if (!this.isModified('password')) return next();
	bcrypt.hash(this.password, 10, (error, passwordHash) => {
		if (error) {
			return next(error);
		}
		this.password = passwordHash;
		next();
	});
});

UserSchema.methods.comparePassword = function (password, callback) {
	bcrypt.compare(password, this.password, (error, isMatch) => {
		if (error) {
			return callback(error);
		} else {
			if (!isMatch) {
				return callback(null, isMatch);
			}
			return callback(null, this);
		}
	});
};

module.exports = mongoose.model('User', UserSchema);

// module.exports.getUserById = function (id, callback) {
// 	User.findById(id, callback);
// };

// module.exports.getUserByUsername = function (username, callback) {
// 	const query = { username: username };
// 	User.findOne(query, callback);
// };

// module.exports.addUser = function (newUser, callback) {
// 	bcrypt.genSalt(10, (err, salt) => {
// 		bcrypt.hash(newUser.password, salt, (err, hash) => {
// 			if (err) throw err;
// 			newUser.password = hash;
// 			newUser.save(callback);
// 		});
// 	});
// };

// module.exports.comparePassword = function (candidatePassword, hash, callback) {
// 	bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
// 		if (err) throw err;
// 		callback(null, isMatch);
// 	});
// };
//
// const User = (module.exports = mongoose.model('User', UserSchema));
