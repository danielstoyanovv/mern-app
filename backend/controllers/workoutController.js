import Workout from '../models/workoutModel.js'

export const getWorkouts = async (req, res) => {
    Workout
        .find()
        .sort({ createdAt: -1 })
        .then(workouts => {
            workouts = JSON.parse(JSON.stringify(workouts));
            workouts.forEach((workout) => {
                workout.key = workout._id
            });
            res.status(200).json(workouts)
        })
        .catch(function (error) {
            res.status(400).json({error: error.message})
        })

}

export const getWorkout = async (req, res) => {
    const { id } = req.params
    await Workout
        .findById(id)
        .exec()
        .then(workout => {
            res.status(200).json(workout)
        })
        .catch(function (error) {
            return res.status(404).json({error: 'No such workout'})
        })
    }

export const createWorkout = async  (req, res) => {
    const {title, load, reps} = req.body
    await Workout.create({
        title,
        load,
        reps
    })
        .then(workout => {
            workout = JSON.parse(JSON.stringify(workout));
            workout.key = workout._id
            res.status(201).json(workout)
        }).catch(function (error) {
            res.status(400).json({error: error.message})
        })
}

export const deleteWorkout = async (req, res) => {
    const { id } = req.params
    await Workout.findOneAndDelete({_id: id})
        .then(workout => {
            res.status(200).json(workout)
        })
        .catch(function (error) {
            res.status(400).json({error: error.message})
        })
}

export const updateWorkout = async (req, res) => {
    const { id } = req.params
    await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })
        .then(async function (result) {
            await Workout
                .findById(id)
                .exec()
                .then(workout => {
                    res.status(200).json(workout)
                })
                .catch(function (error) {
                    res.status(400).json({error: error.message})
                })

        })
        .catch(function (error) {
            return res.status(404).json({error: 'No such workout'})
        })
}