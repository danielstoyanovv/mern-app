"use strict";

import User from '../models/userModel'
import { Request, Response } from "express"
const bcrypt = require("bcrypt")

export const getUsers = async ( req: Request,  res: Response) => {
    try { 
        const limit = req.query.limit ?? null
        const users = await User
            .find()
            .sort({ createdAt: -1 })
            .limit(limit)
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const createUser = async ( req: Request,  res: Response) => {
    try {
        const { username, role } = req.body;
        const password = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({username, password, role})
        res.status(201).json({ message: "New user registered successfully", data: user });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const user = await User
            .findById(id)
            .exec()
        res.status(200).json(user)
    } catch (error) {
        return res.status(404).json({error: 'No such user'})

    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await User.findOneAndDelete({_id: id})
        res.status(200).json({message: "User is deleted successfully"})
    } catch (error) {
        res.status(400).json({error: "Delete user problem"})

    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const password = await bcrypt.hash(req.body.password, 10);
        const { username, role } = req.body;
        await User.findOneAndUpdate({_id: id}, {
            username, role, password
        })
        const user = await User
            .findById(id)
            .exec()
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({error: 'No such workout'})
    }
}