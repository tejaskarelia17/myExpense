/**
 * Created by tejaskarelia on 12/1/17.
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Groups = require('../models/groups');
const Transactions = require('../models/transactions');
const Users = require('../models/user');

//Get Transactions
router.get('/transactions/:userId', function (req, res) {
    Transactions.find({"user_id": req.params.userId}, function(err, transactions){
        res.json(transactions);
    }).sort({"date": -1}).limit(7)
});

//Get Total
router.get('/transactionsTotal/:userId', function(req,res) {
    Transactions.aggregate(
        [
            { $match: { "user_id": req.params.userId} },
            { "$project": {
                "amount": 1,
                "month": { $month: "$date" }
            }},
            {
                $group : {
                    _id : "$month",
                    totalPrice: { $sum: "$amount" }
                }
            }
        ]
    ).exec(function(error, result) {
        if (error) return next(error);
        res.send(result)
    });
});
module.exports = router;