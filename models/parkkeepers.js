const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    name: { type: String },
    ownerid:{type:String},
    state:{type:String},
    isactivate:{type:String}
});


mongoose.model('Keeper', userSchema);