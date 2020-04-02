const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    fname: String,
    lname: String,
    age: Number,
    isvip: Boolean
});

module.exports = mongoose.model('User', userSchema);