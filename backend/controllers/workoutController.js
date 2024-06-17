"use strict";

import Workout from '../models/workoutModel.js'

export const getWorkouts = async (req, res) => {
    await Workout
        .find()
        .sort({ createdAt: -1 })
        .then(workouts => {
            workouts = JSON.parse(JSON.stringify(workouts));
            workouts.forEach((workout) => {
                workout.key = workout._id
                // console.log(`title ${workout.title}`)
            });
            // console.log(`count all workouts ${workouts.length}`)
            res.status(200).json(workouts)
        })
        .catch(error => {
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
        .catch(error => {
            return res.status(404).json({error: 'No such workout'})
        })
    }

export const createWorkout = async  (req, res) => {
    const {title, load, reps} = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill all the fields', emptyFields})
    }

    await Workout.create({
        title,
        load,
        reps
    })
        .then(workout => {
            workout = JSON.parse(JSON.stringify(workout));
            workout.key = workout._id
            res.status(201).json(workout)
        }).catch(error => {
            res.status(400).json({error: error.message})
        })
}

export const deleteWorkout = async (req, res) => {
    const { id } = req.params
    await Workout.findOneAndDelete({_id: id})
        .then(workout => {
            res.status(200).json(workout)
        })
        .catch(error => {
            res.status(400).json({error: error.message})
        })
}

export const updateWorkout = async (req, res) => {
    const { id } = req.params
    await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })
        .then(async result => {
            await Workout
                .findById(id)
                .exec()
                .then(workout => {
                    res.status(200).json(workout)
                })
                .catch(error => {
                    res.status(400).json({error: error.message})
                })

        })
        .catch(error => {
            return res.status(404).json({error: 'No such workout'})
        })
}