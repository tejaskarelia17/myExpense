/**
 * Created by tejaskarelia on 11/20/17.
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Transaction = require('../models/transactions');

//Get Transactions
router.get('/transactions', function (req, res) {
    Transaction.find(function(err, transactions){
        res.json(transactions);
    })
});

//Get Transactions
router.get('/transactions/:userId', function (req, res) {
    //console.log("from transaction.js: "+req.params.userId);
    Transaction.find({"user_id": req.params.userId, "isDeleted": false}, function(err, transactions){
        res.json(transactions);
    }).sort({"date": -1}).limit(7)
});

//Add Transactions
router.post('/addtransaction', function (req, res) {

    let newTransaction = new Transaction({
        name: req.body.name,
        description: req.body.description,
        amount: req.body.amount,
        user_id: req.body.user_id,
        group_name: req.body.group_name,
        date: new Date()
    });
    newTransaction.save((err, transaction) => {
        if(err){
            res.json({success: false, msg:'Failed to add transaction'});
        } else {
            res.json({success: true, msg:' Transaction added successfully'});
        }
    });
});

//Delete Transactions
router.delete('/transaction/:id',  function (req, res) {
    Transaction.remove({_id: req.params.id}, function (err, result) {
        if(err) {
            res.json({success: false, msg:'Failed to delete transaction'});
        } else {
            res.json({success: true, msg:result + ': Transaction deleted'});
        }
    })
});


//Delete Transactions
router.get('/trans/:id', function (req, res) {
    //console.log("from transaction.js: "+req.params.userId);
    Transaction.find({"_id": req.params.id}, function(err, transaction){
        res.json(transaction);
    })
});

router.put('/transaction/:id',  function (req, res) {
    Transaction.updateOne({_id: req.params.id}, {$set:{isDeleted:true}}, function (err, result) {
        if(err) {
            res.json({success: false, msg:'Failed to delete transaction'});
        } else {
            res.json({success: true, msg:result + ': Transaction updated!'});
        }
    })
});

router.put('/restoretransaction/:id',  function (req, res) {
    Transaction.updateOne({_id: req.params.id}, {$set:{isDeleted:false}}, function (err, result) {
        if(err) {
            res.json({success: false, msg:'Failed to delete transaction'});
        } else {
            res.json({success: true, msg:result + ': Transaction updated!'});
        }
    })
});


//Get Transactions for particular group
router.get('/listgrouptransaction/:userId/:group_name', function (req, res) {
    Transaction.find({"user_id": req.params.userId, "group_name": req.params.group_name, "isDeleted": false}, function(err, transactions){
        res.json(transactions);
    }).sort({"date": -1})
});


//Get Transactions
router.get('/deleteTrans/:userId', function (req, res) {
    //console.log("from transaction.js: "+req.params.userId);
    Transaction.find({"user_id": req.params.userId, "isDeleted": true}, function(err, transactions){
        res.json(transactions);
    })
});


//Export Modules
module.exports = router;