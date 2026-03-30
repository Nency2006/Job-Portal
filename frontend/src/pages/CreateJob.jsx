import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import './CreateJob.css'

export default function CreateJob() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        location: '',
        jobType: 'full-time',
        position: '',
        company: localStorage.getItem('companyId') || ''
    })
    const [loading, setLoading] = useState(false)

    // Check if user is logged in and is employer
    useEffect(() => {
        const token = localStorage.getItem('token')
        const role = localStorage.getItem('role')
        
        if (!token) {
            Swal.fire({
                title: 'Login Required',
                text: 'Please log in first to post a job',
                icon: 'warning',
                confirmButtonText: 'Go to Login'
            }).then(() => {
                navigate('/Login')
            })
        } else if (role !== 'employer') {
            Swal.fire({
                title: 'Access Denied',
                text: 'Only employer users can post jobs',
                icon: 'error',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/Jobs')
            })
        }
    }, [navigate])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validation
        if (!formData.title || !formData.description || !formData.requirements || 
            !formData.salary || !formData.location || !formData.position ) {
            alert("All fields are required")
            return
        }

        try {
            setLoading(true)
            const token = localStorage.getItem('token')

            const response = await axios.post(
                "http://localhost:5000/api/jobs/createJobs",
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            Swal.fire({
                title: 'Success',
                text: 'Job posted successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                setFormData({
                    title: '',
                    description: '',
                    requirements: '',
                    salary: '',
                    location: '',
                    jobType: 'full-time',
                    position: '',
                    // company: ''
                })
                navigate('/jobs')
            })
        } catch (error) {
            console.error("Error creating job:", error)
            Swal.fire({
                title: 'Error',
                text: error.response?.data?.message || 'Error posting job',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="create-job-container">
            <div className="create-job-card">
                <h2 className="text-center mb-4">Post a New Job</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Job Title</label>
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., Senior React Developer"
                        />
                    </div>

                    {/* <div className="mb-3">
                        <label className="form-label">Company Name</label>
                        <input
                            type="text"
                            name="company"
                            className="form-control"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Your company name"
                        />
                    </div> */}

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Position</label>
                            <input
                                type="text"
                                name="position"
                                className="form-control"
                                value={formData.position}
                                onChange={handleChange}
                                placeholder="e.g., Manager, Developer"
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Job Type</label>
                            <select
                                name="jobType"
                                className="form-control"
                                value={formData.jobType}
                                onChange={handleChange}
                            >
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                                <option value="contract">Contract</option>
                                <option value="internship">Internship</option>
                            </select>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Salary ($)</label>
                            <input
                                type="number"
                                name="salary"
                                className="form-control"
                                value={formData.salary}
                                onChange={handleChange}
                                placeholder="50000"
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Location</label>
                            <input
                                type="text"
                                name="location"
                                className="form-control"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g., New York, Remote"
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            name="description"
                            className="form-control"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe the job role and responsibilities"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Requirements</label>
                        <textarea
                            name="requirements"
                            className="form-control"
                            rows="4"
                            value={formData.requirements}
                            onChange={handleChange}
                            placeholder="List the skills and experience required"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >
                        {loading ? 'Posting...' : 'Post Job'}
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary w-100 mt-2"
                        onClick={() => navigate('/jobs')}
                    >
                        View All Jobs
                    </button>
                </form>
            </div>
        </div>
    )
}
