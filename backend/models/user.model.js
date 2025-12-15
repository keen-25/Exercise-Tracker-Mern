const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//this only has one field but a couple validations
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    //this trims whitespace with the trim option and has minimums and uniqness 
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

module.exports = User;