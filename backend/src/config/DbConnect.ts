"use strict";

const mongoose = require('mongoose')
const {config} = require("dotenv")
config()

export class DbConnect {
    constructor() {
        if (process.env.NODE_ENV === 'test') {
            return mongoose.connect(process.env.MONGO_URL + '/application-test')
                .then(() => {
                    console.log('mongodb connected')
                })
                .catch((error: object) => {
                    console.log(error)
                })
        }
        mongoose.connect(process.env.MONGO_URL + '/application')
            .then(() => {
                console.log('mongodb connected')
            })
            .catch((error: object) => {
                console.log(error)
            })
    }
}