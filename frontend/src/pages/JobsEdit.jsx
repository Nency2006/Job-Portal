import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Jobs.css'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function Jobs() {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const Navigate = useNavigate();

    useEffect(() => {
        const fetchJobsByid = async () => {
            const userId = localStorage.getItem("userId");

            const data = fetchJobs(userId);
            console.log(data);
        }
        fetchJobsByid();
    }, [])

    const fetchJobs = async (id) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios.get(
                `http://localhost:5000/api/jobs/jobsById/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setJobs(response.data.jobs || response.data || [])
        } catch (error) {
            console.error("Error fetching jobs:", error)
        }
    }

    // DELETE JOB
    const deleteJob = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel"
        });

        if (result.isConfirmed){

            try {
                await axios.delete(`http://localhost:5000/api/jobs/deleteJob/${id}`)
                fetchJobs() // refresh list
            } catch (error) {
                console.error("Error deleting job:", error)
            }
        }
    }


    return (
        <div className="container py-5">

            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">Your Posted Jobs</h2>
                <span className="badge bg-primary fs-6">
                    {jobs.length} Jobs
                </span>
            </div>

            <div className="row g-4">

                {jobs.map((job) => (
                    <div key={job._id} className="col-lg-4 col-md-6">

                        <div className="card border-0 shadow-sm rounded-4 h-100 job-card-hover">

                            {/* CARD HEADER */}
                            <div className="card-body">

                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <h5 className="fw-bold mb-0">{job.title}</h5>
                                    <span className="badge bg-success">Active</span>
                                </div>

                                <p className="text-muted mb-2">
                                    <i className="bi bi-geo-alt-fill text-primary me-2"></i>
                                    {job.location}
                                </p>

                                <p className="text-muted mb-2">
                                    <i className="bi bi-currency-dollar text-primary me-2"></i>
                                    ${job.salary}
                                </p>

                                <p className="text-muted small">
                                    {job.description}
                                </p>

                                <p className="text-muted small">
                                    {job.requirements}
                                </p>

                                {/* BUTTONS */}
                                <div className="d-flex gap-1 mt-3">
                                    <button className="btn btn-outline-primary w-100" onClick={() => Navigate(`/update-jobs/${job._id}`)}>
                                        <i className="bi bi-pencil-square me-2"></i>
                                        Update
                                    </button>

                                    <button className="btn btn-outline-danger w-100" onClick={deleteJob}>
                                        <i className="bi bi-trash me-2"></i>
                                        Delete
                                    </button>

                                    <button className="btn btn-outline-success w-100" onClick={() => Navigate(`/employer/applicants/${job._id}`)}>
                                        <i className="bi bi-person me-2"></i>
                                        Applicants
                                    </button>
                                </div>

                            </div>

                        </div>
                    </div>
                ))}

            </div>

            {/* EMPTY STATE */}
            {jobs.length === 0 && (
                <div className="text-center mt-5">
                    <i className="bi bi-briefcase display-4 text-muted"></i>
                    <h5 className="mt-3">No jobs posted yet</h5>
                </div>
            )}

        </div>
    )
}