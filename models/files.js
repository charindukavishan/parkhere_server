const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
   to: { type: String },
    originalname:{type:String},
   mimetype:{type:String},
    filename:{type:String},
    path:{type:String},
    isRead:{type:String},
    
});


mongoose.model('files', userSchema);