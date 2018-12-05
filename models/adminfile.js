const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    sendto: { type: String },
    originalname:{type:String},
    mimetype:{type:String},
    filename:{type:String},
    path:{type:String},
    time:{type:String},

});


mongoose.model('adminfile', userSchema);