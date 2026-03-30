import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Login({ setShowLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/api/users/login", {
                email,
                password
            });

            // Store token and role
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.role);
            localStorage.setItem('userId', res.data.userId);
            


            Swal.fire({
                title: 'Success',
                text: res.data.message,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                setEmail("");
                setPassword("");
                
                if (res.data.role === "admin") {
                    navigate("/admin")
                }

                else if (res.data.role === "employer") {
                    navigate("/Company")
                }

                else {
                    navigate("/candidateForm")
                }
            });

        } catch (error) {
            if (error.response && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert("Server error");
            }
        }
    };


    return (
        <section className="vh-100 bg-light d-flex align-items-center justify-content-center">
            <div className="card p-4" style={{ width: "400px" }}>
                <h3 className="text-center mb-4">Login</h3>

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <p className="text-end mt-1">
                        <span
                            style={{ cursor: "pointer", color: "blue" }}
                            onClick={() => navigate("/forgot-password")}
                        >
                            Forgot Password?
                        </span>
                    </p>

                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>

                <p className="text-center mt-3 mb-0">
                    Don't have an account?{" "}
                    <Link to="/register"
                        style={{ cursor: "pointer", color: "blue" }}
                        onClick={() => setShowLogin(false)}
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </section>
    );
}
