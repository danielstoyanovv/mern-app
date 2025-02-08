import {useEffect, useState} from "react";
import UserDetails from "../components/UserDetails";

const Home = () => {
    const [users, setUsers] = useState('')
    const [usersCount, setUsersCount] = useState('')
    //fires when component is rendered
    useEffect(() => {
        async function usersPage() {
            const response = await fetch('/api/users', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"

                }
            })
            const json = await response.json()
            console.log(json.data.users)
            if (response.ok) {
                setUsers(json.data.users)
                setUsersCount(json.data.total)
            }
        }
        usersPage()
    }, [])
    return (
        <div className="home">
            <div className="users">
                All users: {usersCount}
                {users && users.map((user) => (
                    <UserDetails key={user._id} user={user}>
                    </UserDetails>
                ))}
            </div>
        </div>
    )
}
export default Home