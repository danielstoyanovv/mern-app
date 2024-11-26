"use strict";

import User from '../models/userModel'
import { Request, Response } from "express"
const bcrypt = require("bcrypt")
import { STATUS_SUCCESS, STATUS_ERROR, INTERNAL_SERVER_ERROR } from "../constants/data"

export const getUsers = async ( req: Request,  res: Response) => {
    try { 
        const limit = req.query.limit ?? null
        const users = await User
            .find()
            .sort({ createdAt: -1 })
            .limit(limit)
        res.status(200).json({
            status: STATUS_SUCCESS, 
            data: {
                users,
                "total" : users.length
            },
            message: ""
        })
    } catch (error) {
        res.status(500).json({ 
            status: STATUS_ERROR, 
            data: [],
            message: INTERNAL_SERVER_ERROR 
        });
    }
}

export const createUser = async ( req: Request,  res: Response) => {
    try {
        const { email, role } = req.body;
        const password = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({email, password, role})
        res.status(201).json({ 
            status: STATUS_SUCCESS, 
            data: user,
            message: "New user registered successfully" 
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ 
            status: STATUS_ERROR, 
            data: [],
            message: INTERNAL_SERVER_ERROR 
        });
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const user = await User
            .findById(id)
            .exec()
        res.status(200).json({
            status: STATUS_SUCCESS, 
            data: user,
            message: ""
        })
    } catch (error) {
        return res.status(404).json({
            status: STATUS_ERROR, 
            data: [],
            message: INTERNAL_SERVER_ERROR
        })

    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await User.findOneAndDelete({_id: id})
        res.status(200).json({
            status: STATUS_SUCCESS,
            data: [],
            message: "User is deleted successfully"
        })
    } catch (error) {
        res.status(400).json({
            status: STATUS_ERROR, 
            data: [],
            message: INTERNAL_SERVER_ERROR
        })

    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const password = await bcrypt.hash(req.body.password, 10);
        const { email, role } = req.body;
        await User.findOneAndUpdate({_id: id}, {
            email, role, password
        })
        const user = await User
        .findById(id)
        .exec()
        res.status(200).json({
            status: STATUS_SUCCESS, 
            data: user,
            message: ""
        })
    } catch (error) {
        res.status(400).json({
            status: STATUS_ERROR, 
            data: [],
            message: INTERNAL_SERVER_ERROR
        })

    }
}