const mongoose = require('mongoose');
const config = require('../config/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    schoolName: {
        type: String,
        required: true
    },
    totalClassses: {
        type: Number,
        default: 0
    },
    totalStudents: {
        type: Number,
        default: 0
    },
    totalTeachers: {
        type: Number,
        default: 0
    },
    totalParents: {
        type: Number,
        default: 0
    }


});

adminSchema.statics.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

adminSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}


adminSchema.statics.generateToken = function (user) {
    return jwt.sign({ _id: user._id, email: user.email }, config.JWT_SECRET, {
        expiresIn: '1d'
    });
}


adminSchema.statics.verifyToken = function (token) {
    return jwt.verify(token, config.JWT_SECRET);
}



const adminModel = mongoose.model('admin', adminSchema);
module.exports = adminModel;