"use strict";

const mongoose = require('mongoose')
const {config} = require("dotenv")
config()

export class DbConnect {
    constructor() {
        const DB_NAME = process.env.NODE_ENV === 'test' ? "application-test" : "application"
        mongoose.connect(process.env.MONGO_URL + '/' + DB_NAME)
            .then(() => {
                console.log('mongodb connected')
            })
            .catch((error: object) => {
                console.log(error)
            })
    }
}