import {useState} from "react";
import {useWorkoutsContext} from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const {dispatch} = useWorkoutsContext()
    const [emptyFields, setEmptyFields] = useState([])


    const handleSubmit = async (e) => {
        e.preventDefault()
        const workout = {title, load, reps}
        const response = await fetch('/api/workouts', {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = response.json()

        if (!response.ok) {
            json.then(result => {
                setError(result.error)
                setEmptyFields(result.emptyFields)
            })
        }

        if (response.ok) {
            setEmptyFields([])
            setError(null)
            setTitle('')
            setLoad('')
            setReps('')
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add new workout</h3>
            <label>Exercise Title</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            >
            </input>

            <label>Load (in kg):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            >
            </input>

            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            >
            </input>
            <button>Save</button>
            {error && <div className="error">{error}</div> }
        </form>

    )
}

export default WorkoutForm
