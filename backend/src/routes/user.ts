"use strict";

import express from "express";
import {createUser} from "../controllers/userController";
const router = express.Router()

// router.get('/', getWorkouts)

// router.get('/:id', getWorkout)

router.post('/', createUser)

// router.delete('/:id', deleteWorkout)

// router.patch('/:id', updateWorkout)

export default router;