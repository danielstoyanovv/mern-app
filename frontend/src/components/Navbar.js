import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Users page</h1>
                </Link>
                <Link to="/register">
                    <h1>Registration</h1>
                </Link>
            </div>
        </header>
    )
}

export default Navbar