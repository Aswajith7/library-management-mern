const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id : {
        type : Int16Array,
        required : true,
        unique : true,
        default : null
    },

    owned : {
        type : Boolean,
        required : true,
        default : false
    },

    ownedAt : {
        type : Date,
        required : true,
        default : null

    },
    { timestamps: true }

};
 

module.exports = mongoose.model('User', userSchema);
    