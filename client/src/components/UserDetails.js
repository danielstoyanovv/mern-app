import {formatDistanceToNow} from "date-fns/formatDistanceToNow";

const UserDetails = ({ user }) => {

    return (
        <div id={user._id} className="workout-details">
            <p><b>(Email): {user.email}</b></p>
            <p>(id): {user._id}</p>
            <p>(Role): {user.role}</p>
            <p>(Password) {user.password}</p>
            <p>(Created at) {formatDistanceToNow(new Date(user.createdAt), {addSuffix: true})}</p>
        </div>
    )
}

export default UserDetails