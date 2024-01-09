import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 20,
        trim: true
    },
    reps: {
        type: Number,
        required: true,
    },
    load: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});

export default mongoose.model('Workout', workoutSchema)