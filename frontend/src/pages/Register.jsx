import React from 'react'
import axios from 'axios';
import './Register.css';
import Login from "./Login";
import Company from './CreateCompany';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showLogin, setShowLogin] = useState(false);
    const navigate = useNavigate();


    const insertUser = async () => {

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            await axios.post("http://localhost:5000/api/users/register", {
                name: name,
                email: email,
                role: role,
                password: password
            });
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            Swal.fire({
                title: 'Success',
                text: 'User registered successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            })
            navigate('/Login');

        } catch (error) {
            console.error("Error registering user:", error);
            alert("An error occurred while registering. Please try again.");
        }
    };
    return (

        <div>
            {showLogin ? (
                <Login setShowLogin={setShowLogin} />
            ) : (
                <section className="vh-100 bg-light d-flex align-items-center justify-content-center">
                    <div className="card p-4" style={{ width: "400px" }}>

                        <h2 className="text-uppercase text-center mb-5">
                            Sign Up
                        </h2>

                        <form method="POST"
                            onSubmit={(e) => {
                                e.preventDefault();
                                insertUser();
                            }}
                        >
                            <div className="mb-3">
                                <label
                                    className="form-label"
                                >
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />

                            </div>

                            <div className="mb-3">
                                <label
                                    className="form-label"
                                >
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                            </div>

                             <div className="mb-3">
                                <label
                                    className="form-label"
                                >
                                    Role
                                </label>
                                <select
                                    className="form-control"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="">Select Role</option>
                                    <option value="jobseeker">Job Seeker</option>
                                    <option value="employer">Employer</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label
                                    className="form-label"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                            </div>

                            <div className="mb-3">
                                <label
                                    className="form-label"
                                >
                                    Repeat your password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />

                            </div>


                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                            >
                                Register
                            </button>


                            <p className="text-center mt-3 mb-0">
                                Have already an account?{" "}

                                <span style={{ cursor: "pointer", color: "blue" }} onClick={() => setShowLogin(true)}>Login here</span>

                            </p>
                        </form>
                    </div>

                </section>
            )}
        </div>
    )
};
