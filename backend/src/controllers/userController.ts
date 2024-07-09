"use strict";

import User from '../models/userModel'
import { Request, Response } from "express"

export const getUsers = async ( req: Request,  res: Response) => {
    try {
        const users = await User
            .find()
            .sort({ createdAt: -1 })
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const createUser = async ( req: Request,  res: Response) => {
    try {
        const { username, password, role } = req.body;
        await User.create({username, password, role})
        res.status(201).json({ message: "New user registered successfully" });
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
        await User.findOneAndUpdate({_id: id}, {
            ...req.body
        })
        const user = await User
            .findById(id)
            .exec()
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({error: 'No such workout'})
    }
}