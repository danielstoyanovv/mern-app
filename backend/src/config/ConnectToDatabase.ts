"use strict";

const mongoose = require('mongoose')
const {config} = require("dotenv")
config()

export class ConnectToDatabase {
    constructor() {
        const DB_NAME = process.env.NODE_ENV === 'test' ? process.env.MONGO_DB_NAME +  "_test" : process.env.MONGO_DB_NAME
        mongoose.connect(process.env.MONGO_URL + '/' + DB_NAME)
            .then(() => {
                console.log('mongodb connected')
            })
            .catch((error: object) => {
                console.log(error)
            })
    }
}