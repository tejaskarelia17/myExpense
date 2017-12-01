/**
 * Created by tejaskarelia on 11/15/17.
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config/database');
const User = require('../models/user');
const Transaction = require('../models/transactions');

//Register Route
router.post('/register', (req, res, next) => {
   let newUser = new User({
       name: req.body.name,
       username: req.body.username,
       email: req.body.email,
       password: req. body.password
   });

   User.addUser(newUser, (err, user) => {
       if(err){
           res.json({success: false, msg: 'Failed to Register!!!'});
       } else {
           res.json({success: true, msg: 'User Registered!!!'});
       }
   });
});


//Authenticate Route
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;

       if(!user){
           return res.json({success: false, msg: 'User not Found!!!'});
       };

       User.comparePassword(password, user.password, (err, isMatch) => {
           if(err) throw err;
           if(isMatch){
               const token = jwt.sign(user.toJSON(), config.secret, {
                   expiresIn: 604800 // Expires in 1 Week
               });

               res.json({
                   success: true,
                   token: 'bearer '+token,
                   user: {
                       id: user._id,
                       name: user.name,
                       email: user.email,
                       username: user.username
                   }
               });
           } else {
               return res.json({success: false, msg: 'Username/ Password doesnt match'});
           }
       });
    });
});

//Profile Route
router.get('/profile', passport.authenticate('jwt', { session: false }), function (req, res) {
    res.json({user: req.user});
});

//Dashboard Route
router.get('/dashboard', passport.authenticate('jwt', { session: false }), function (req, res) {
    res.json({user: req.user});
});

//EditProfile Route
router.get('/editprofile', passport.authenticate('jwt', { session: false }), function (req, res) {
    res.json({user: req.user});
});

// //Get Transactions
// router.get('/transactions', function (req, res) {
//     Transaction.find(function(err, transactions){
//         res.json(transactions);
//     })
// });
//
//
// //Add Transactions
// router.post('/addtransaction', passport.authenticate('jwt', { session: false }), function (req, res) {
//
//     let newTransaction = new Transaction({
//         name: req.body.name,
//         description: req.body.description,
//         amount: req.body.amount,
//         user_id: req.body.user_id
//     });
//     newTransaction.save((err, transaction) => {
//         if(err){
//             res.json({success: false, msg:'Failed to add transaction'});
//         } else {
//             res.json({success: true, msg:'Transaction added successfully'});
//         }
//     });
// });
//
// //Delete Transactions
// router.delete('/transaction/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
//     Transaction.remove({_id: req.params.id}, function (err, result) {
//         if(err) {
//             res.json({success: false, msg:'Failed to delete transaction'});
//         } else {
//             res.json({success: true, msg:result + ': Transaction deleted'});
//         }
//     })
// });


//Export Modules
module.exports = router;