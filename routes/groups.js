/**
 * Created by tejaskarelia on 11/28/17.
 */
const express = require('express');
const router = express.Router();

const config = require('../config/database');
const Groups = require('../models/groups');

//Get Groups
router.get('/listgroups', function (req, res) {
    Groups.find(function(err, groups){
        res.json(groups);
    })
});

//Get Groups
router.get('/listgroups/:userId', function (req, res) {
    Groups.find({"user_id": req.params.userId}, function(err, groups){
        res.json(groups);
    })
});


//Add Groups
router.post('/addgroup', function (req, res) {
    let newGroup = new Groups({
        name: req.body.name,
        description: req.body.description,
        user_id: req.body.user_id,
        date: new Date()
    });
    newGroup.save((err, groups) => {
        if(err){
            res.json({success: false, msg:'Failed to add Group'});
        } else {
            res.json({success: true, msg:' Group added successfully'});
        }
    });
});

//Delete Groups
router.delete('/group/:id', function (req, res) {
    Groups.remove({_id: req.params.id}, function (err, result) {
        if(err) {
            res.json({success: false, msg:'Failed to delete group'});
        } else {
            res.json({success: true, msg:result + ': Group deleted'});
        }
    })
});

module.exports = router;