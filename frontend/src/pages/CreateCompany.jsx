import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react'

export default function CreateCompany() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [industry, setIndustry] = useState("")
    const [location, setLocation] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")

    useEffect(() => {
        const role = localStorage.getItem('role');
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        if (role !== 'employer') {
            Swal.fire({
                title: 'Access Denied',
                text: 'Only employer users can create company profile',
                icon: 'error'
            }).then(() => navigate('/company'));
            return;
        } else if(role === 'employer') {
            const checkCompany = async () => {
                try {
                    const res = await axios.get(
                        'http://localhost:5000/api/admin/company/getCompany',
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
                    const companyData = res.data.company || res.data;   
                    if (companyData?._id) {
                        localStorage.setItem('companyId', companyData._id);
                        navigate('/');
                    }
                } catch (error) {
                    console.log("No company found → stay on page");
                }   
            };
            checkCompany();
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            const response = await axios.post('http://localhost:5000/api/admin/company/createCompany', {
                name,
                industry,
                location,
                email,
                contactNumber: contact
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            localStorage.setItem('companyId', response.data.companyId);
            Swal.fire({
                title: "Success!",
                text: "Company created successfully!",
                icon: "success"
            })
            navigate('/create-job')
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Failed to create company.",
                icon: "error"
            })
        }
    }

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '90vh',
        backgroundColor: '#f8f9fa',
        padding: '20px'
    }

    const cardStyle = {
        backgroundColor: '#fff',
        padding: '30px 40px',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        width: '100%'
    }

    const headingStyle = {
        fontWeight: 600,
        color: '#343a40'
    }

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h2 className="text-center mb-4" style={headingStyle}>Company Details</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Company Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your Company Name"
                        />
                    </div>                    

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Industry</label>
                            <input
                                type="text"
                                name="industry"
                                className="form-control"
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
                                placeholder="e.g., IT, Finance, Healthcare"
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Location</label>
                            <input
                                type="text"
                                name="location"
                                className="form-control"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="e.g., New York, Remote"
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Company Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="company@example.com"
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Contact Number</label>
                            <input
                                type="text"
                                name="contact"
                                className="form-control"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                placeholder="e.g., +91 234 567 890"
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-100" style={{ borderRadius: '8px', padding: '10px', fontWeight: 500 }}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}