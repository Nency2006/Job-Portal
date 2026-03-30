import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

export default function Updatepage() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [job, setJob] = useState({
        title: "",
        location: "",
        salary: "",
        description: "",
        requirements : ""
    })

    useEffect(() => {
        fetchJob()
    }, [])

    const fetchJob = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                `http://localhost:5000/api/jobs/singleJob/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )

            setJob(res.data || res.data.job || "")
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (e) => {
        setJob({ ...job, [e.target.name]: e.target.value })
    }

    const updateJob = async (e) => {
        e.preventDefault()

        try {
            const token = localStorage.getItem("token")

            await axios.put(
                `http://localhost:5000/api/jobs/updateJobs/${id}`,
                job,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )

            Swal.fire({
                title: 'Success',
                text: "Job Updated Successfully",
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate("/jobs-edit");
            });

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="container py-5">

            <h2 className="mb-4">Edit Job</h2>

            <form onSubmit={updateJob} className="card p-4 shadow">

                <input
                    type="text"
                    name="title"
                    value={job.title}
                    onChange={handleChange}
                    placeholder="Job Title"
                    className="form-control mb-3"
                />

                <input
                    type="text"
                    name="location"
                    value={job.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="form-control mb-3"
                />

                <input
                    type="text"
                    name="salary"
                    value={job.salary}
                    onChange={handleChange}
                    placeholder="Salary"
                    className="form-control mb-3"
                />

                <textarea
                    name="description"
                    value={job.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="form-control mb-3"
                />

                <textarea
                    name="requirements"
                    value={job.requirements}
                    onChange={handleChange}
                    placeholder="Description"
                    className="form-control mb-3"
                />

                <button className="btn btn-primary">
                    Update Job
                </button>

            </form>
        </div>
    )
}