/**
 * Created by tejaskarelia on 11/28/17.
 */
const mongoose = require('mongoose');
const config = require('../config/database');

//User Schema
const GroupsSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    user_id : {
        type: String,
        required: true
    },
    date: {
        type: Date,
    }
});

const Groups = module.exports = mongoose.model('Groups', GroupsSchema);

