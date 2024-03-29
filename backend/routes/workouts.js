import express from "express";
import {createWorkout, getWorkouts, getWorkout, updateWorkout, deleteWorkout} from "../controllers/workoutController.js";
const router = express.Router()

router.get('/', getWorkouts)

router.get('/:id', getWorkout)

router.post('/', createWorkout)

router.delete('/:id', deleteWorkout)

router.patch('/:id', updateWorkout)

export default router;