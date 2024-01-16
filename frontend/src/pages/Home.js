import {useEffect, useState} from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
    const [workouts, setWorkouts] = useState(null)

    //fires when component is rendered
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch("/api/workouts")
            const json = await response.json()
            console.log()
            if (response.ok) {
                setWorkouts(json)
            }
        }

        fetchWorkouts()
    }, [])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout}>
                    </WorkoutDetails>
                ))}
                <WorkoutForm />
            </div>
        </div>
    )
}

export default Home