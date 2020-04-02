const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

router.get('/', (req, res, next) => {
    User.find().exec().then((docs) => {
        console.log(docs);
        res.status(200).json({
        message: 'Handling GET requests to /users',
        allUsers: docs
    });
    }).catch((err) => {
        res.status(500).json(err);
    });
});

router.post('/', (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        fname: req.body.fname,
        lname: req.body.lname,
        age: req.body.age,
        isvip: req.body.isvip
    });
    user.save().then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
    res.status(200).json({
        message: 'Handling POST requests to /users',
        createdUser: user
    });
});

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id).exec().then((doc) => {
        console.log(doc);
        res.status(200).json({
            message: 'Handling GET requests to /users/id',
            createdUser: doc
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.patch('/:userId', (req, res, next) => {
    const id = req.params.userId;
    const updateatrs = {};
    for(const key of req.body) {
        updateatrs[key.propName] = key.value;
    }
    User.update({_id: id}, {$set: updateatrs}).exec().then((doc) => {
        console.log(doc);
        res.status(200).json({
            message: doc
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.remove({_id: id}).exec().then((doc) => {
        console.log(doc);
        res.status(200).json(doc);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;