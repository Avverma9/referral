const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    name: {
        type: String,
        required:true,
        trim:true
    },
    email: {
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    mobile: {
        type:Number,
        required:true
    },
    password: {
        type:String,
        required:true, 
    },
    refferalLink:{
         type:String,
     },
     sharedCount:{
        type: Number,
        default:0
    },
    successRefferal:{
        type: Number,
        default:0
    } , 
    isAdmin:{
        type: Boolean,
        default:false
    },
    userNameArray:{
        type: [String],
        default:[]
    }
},
 { timestamps: true });

module.exports = mongoose.model('user', userSchema)