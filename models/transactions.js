/**
 * Created by tejaskarelia on 11/19/17.
 */
const mongoose = require('mongoose');
const config = require('../config/database');

//User Schema
const TransactionSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    amount : {
        type: Number,
        required: true
    },
    user_id : {
        type: String,
        required: true
    },
    group_name : {
        type: String,
        required: true
    },
    isDeleted : {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Date,
    }
});

const Transaction = module.exports = mongoose.model('Transaction', TransactionSchema);

