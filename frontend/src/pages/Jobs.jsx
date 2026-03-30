import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Jobs.css'

export default function Jobs() {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const Navigate =  useNavigate()

    useEffect(() => {
        fetchJobs()
    }, [])

    const fetchJobs = async () => {
        try {
            setLoading(true)
            const response = await axios.get("http://localhost:5000/api/jobs/getJobs")
            setJobs(response.data.jobs || [])
        } catch (error) {
            console.error("Error fetching jobs:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="jobs-container">
            <div className="jobs-header">
                <h1>Available Jobs</h1>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <p>Loading jobs...</p>
                </div>
            ) : jobs.length === 0 ? (
                <div className="text-center py-5">
                    <p>No jobs available</p>
                </div>
            ) : (
                <div className="jobs-grid">
                    {jobs.map((job) => (
                        <div key={job._id} className="job-card">
                            <div className="job-header">
                                <h3>{job.title}</h3>
                                <span className="job-type">{job.jobType}</span>
                            </div>

                            <div className="job-company">
                                <strong>Company:</strong> {job.company?.name || 'N/A'}
                            </div>

                            <div className="job-location">
                                <strong>Location:</strong> {job.location}
                            </div>

                            <div className="job-salary">
                                <strong>Salary:</strong> ${job.salary}
                            </div>

                            <div className="job-position">
                                <strong>Position:</strong> {job.position}
                            </div>

                            <div className="job-description">
                                <strong>Description:</strong>
                                <p>{job.description}</p>
                            </div>

                            <div className="job-postedby">
                                <small>Posted by: {job.createdBy?.name || 'N/A'}</small>
                            </div>

                            <div className="d-flex">
                                <button className="btn btn-outline-success" onClick={() => Navigate(`/job-details/${job._id}`)}>
                                    More Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
