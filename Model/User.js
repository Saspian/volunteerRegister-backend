const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        min: 6,
        max: 255
    },
    contact: {
        type:Number,
        unique: true,
        required: true
    },
    email: {
        type:String,
        unique: true,
        required: true,
        max:255,
    },
    password: {
        type:String,
        required: true,
        max:1024,
        min:6
    },
    repassword:{
        type:String,
        required: true,
        max:1024,
        min:6
    },
    date : {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User',userSchema);