import express from "express";
import {createWorkout, getWorkouts, getWorkout} from "../controllers/workoutController.js";
const router = express.Router()

router.get('/', getWorkouts)

router.get('/:id', getWorkout)

router.post('/', createWorkout)

router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a workout'})
})

router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a workout'})
})

export default router;