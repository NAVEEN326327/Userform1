const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    // name, dob, email, ph no.
    name: {
        type: String, lowercase: true,
        required: [true, "Can't be blank"],
        minlength: 3
    },
    dob: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 6
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        minlength: 10
    }

},{
    timestamps: true,
})

const User = mongoose.model('User', userSchema);

module.exports = User;