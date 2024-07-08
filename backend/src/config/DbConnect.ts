"use strict";

import mongoose from 'mongoose'
import {config} from "dotenv"
config()

export class DbConnect {
    constructor() {
        mongoose.connect(process.env.MONGO_URL + '/application')
            .then(() => {
                console.log('mongodb connected')
            })
            .catch((error) => {
                console.log(error)
            })
    }
}