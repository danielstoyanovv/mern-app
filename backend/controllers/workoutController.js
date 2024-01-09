import Workout from '../models/workoutModel.js'

export const getWorkouts = async (req, res) => {
    Workout
        .find()
        .sort({ createdAt: -1 })
        .then(function (result) {
            res.status(200).json(result)
        })
        .catch(function (error) {
            res.status(400).json({error: error.message})
        })

}

export const getWorkout = async (req, res) => {
    try {
        const { id } = req.params
        const workout = await Workout
            .findById(id)
            .exec()
        res.status(200).json(workout)
    } catch (error) {
        return res.status(404).json({error: 'No such workout'})
    }
}

export const createWorkout = async  (req, res) => {
    const {title, load, reps} = req.body
    await Workout.create({
        title,
        load,
        reps
    })
        .then(function (result) {
            res.status(201).json(result)
        })
        .catch(function (error) {
            res.status(400).json({error: error.message})
        })
}