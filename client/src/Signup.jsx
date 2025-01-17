import { useState } from "react";
import { Link } from "react-router-dom"; 
import axios from 'axios';

function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage(""); // Reset error message on each submit

        if (!firstName || !lastName || !username || !email || !password) {
            setErrorMessage("All fields must be filled.");
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;
        if (!passwordRegex.test(password)) {
            setErrorMessage("Password must be at least 8 characters long and include uppercase letters, numbers, and special characters.");
            return;
        }

        axios.post('http://localhost:3001/register', { firstName, lastName, username, email, password })
            .then(result => {
                console.log(result);
                // Optionally redirect or provide feedback
            })
            .catch(err => {
                console.log(err);
                if (err.response && err.response.data.message) {
                    setErrorMessage(err.response.data.message); // Display backend error message
                } else {
                    setErrorMessage("An error occurred during registration. Please try again.");
                }
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="firstName"><strong>First Name</strong></label>
                        <input
                            type="text"
                            placeholder="Enter First Name"
                            autoComplete="off"
                            name="firstName"
                            className="form-control rounded-0"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName"><strong>Last Name</strong></label>
                        <input
                            type="text"
                            placeholder="Enter Last Name"
                            autoComplete="off"
                            name="lastName"
                            className="form-control rounded-0"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username"><strong>Username</strong></label>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            autoComplete="off"
                            name="username"
                            className="form-control rounded-0"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Register
                    </button>
                </form>
                <p>Already Have an Account?</p>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;
