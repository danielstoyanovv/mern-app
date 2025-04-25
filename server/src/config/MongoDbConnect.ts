"use strict";

const mongoose = require('mongoose')
const {config} = require("dotenv")
config()
import {DatabaseConnectionError} from "../errors/database-connection-error";
import {LoggerService} from "../services/LoggerService";

const logger = new LoggerService()
    .createLogger()

export class MongoDbConnect {
    constructor() {
        const DB_NAME = process.env.NODE_ENV === 'test' ? process.env.MONGO_DB_NAME +  "_test" : process.env.MONGO_DB_NAME
        logger.info(`Database ${DB_NAME} establishing connection ` + new Date())
        mongoose.connect(process.env.MONGO_URL + '/' + DB_NAME)
            .then(() => {
                logger.info('MongoDb connection established! ' + new Date())
            })
            .catch((error: object) => {
                throw new DatabaseConnectionError(error)
            })
    }
}