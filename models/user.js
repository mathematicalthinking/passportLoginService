const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    createdBy: {
        type: ObjectId,
        ref: 'User'
    },
    createDate: {
        type: Date,
        'default': Date.now()
    },
    isTrashed: {
        type: Boolean,
        'default': false
    },
    email: {
        type: String,
    },
    password: {
        type: String
    },
    username: {
        type: String,
        unique: true
    },
    facebookID: String,
    googleID: String,
    accountType: String,
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
