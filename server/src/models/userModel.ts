"use strict";

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 256,
    },
    password: {
        type: String,
        required: true,
        maxlength: 256,
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