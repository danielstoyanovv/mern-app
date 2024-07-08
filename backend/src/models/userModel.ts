"use strict";

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: 20,
    },
    password: {
        type: String,
        required: true,
        maxlength: 20,
    },
    role:{
        type: String,
        required: true,
        default: "user",
        maxlength: 20,
    }
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema)