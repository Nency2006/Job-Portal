import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import Swal from 'sweetalert2';


export default function CompanyDetails() {
    const [company, setCompany] = useState(null);
    const [isEdit, setEdit] = useState(false);
    const [comData, setComData] = useState({
        name: "",
        industry: "",
        location: "",
        email: "",
        contactNumber: ""
    })

    useEffect(() => {
        const fetchCompany = async () => {
            const companyId = localStorage.getItem("companyId");
            const data = await getCompanyById(companyId);
            console.log(data);
        };

        fetchCompany();
    }, [])

    const getCompanyById = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/admin/company/getCompany/${id}`);
            const company = res.data.company;
            setCompany(company);
            setComData({
                name: company.name,
                industry: company.industry,
                location: company.location,
                email: company.email,
                contactNumber: company.contactNumber
            })

        } catch (error) {
            console.error("Error fetching company details:", error);
        }
    }

    const updateCom = async () => {
        try {
            const comId = localStorage.getItem("companyId")

            await axios.put(`http://localhost:5000/api/admin/company/updateCompany/${comId}`, comData)

            Swal.fire({
                title: "success",
                icon: "success",
                text: "Company updated successfully",
                confirmButtonText: "Ok"
            }).then(() => {
                setComData({ ...company, ...comData })
                setEdit(false);
            });
        } catch (error) {
            console.error("Update error:", error);
        }

    }

    return (
        <div>
            <div className="container py-5">
                {company ? (
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-8">

                            <div className="card shadow border-0 rounded-4">

                                {/* Header */}
                                <div className="card-header bg-primary text-white text-center rounded-top-4 py-4">
                                    <i className="bi bi-building fs-1"></i>
                                    <h4 className="mt-2 mb-0">Company Details</h4>
                                </div>

                                {/* Body */}
                                <div className="card-body p-4">

                                    <div className="mb-3">
                                        <label className="text-muted">Company Name</label>
                                        {isEdit ? (
                                            <input type='text' className='form-control' value={comData.name} onChange={(e) => setComData({ ...comData, name: e.target.value })} />
                                        ) : (
                                            <div className="fw-semibold fs-5">{company.name}</div>
                                        )}

                                    </div>

                                    <hr />

                                    <div className="mb-3">
                                        <label className="text-muted">Industry</label>
                                        {isEdit ? (
                                            <input type='text' className='form-control' value={comData.industry} onChange={(e) => setComData({ ...comData, industry: e.target.value })} />
                                        ) : (
                                            <div className="fw-semibold">{company.industry}</div>
                                        )}

                                    </div>

                                    <hr />

                                    <div className="mb-3">
                                        <label className="text-muted">Location</label>
                                        {isEdit ? (
                                            <input type='text' className='form-control' value={comData.location} onChange={(e) => setComData({ ...comData, location: e.target.value })} />
                                        ) : (
                                            <div className="fw-semibold">{company.location}</div>
                                        )}

                                    </div>

                                    <hr />

                                    <div className="mb-3">
                                        <label className="text-muted">Email</label>
                                        {isEdit ? (
                                            <input type='text' className='form-control' value={comData.email} onChange={(e) => setComData({ ...comData, email: e.target.value })} />
                                        ) : (
                                            <div className="fw-semibold">{company.email}</div>
                                        )}

                                    </div>

                                    <hr />

                                    <div className="mb-4">
                                        <label className="text-muted">Contact Number</label>
                                        {isEdit ? (
                                            <input type='text' className='form-control' value={comData.contactNumber} onChange={(e) => setComData({ ...comData, contactNumber: e.target.value })} />
                                        ) : (
                                            <div className="fw-semibold">{company.contactNumber}</div>
                                        )}

                                    </div>

                                    {/* Buttons */}
                                    <div className="d-grid gap-2">
                                        {isEdit ? (
                                            <button
                                                className="btn btn-success"
                                                onClick={updateCom}
                                            >
                                                Save Changes
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-outline-primary"
                                                onClick={() => setEdit(true)}
                                            >
                                                Edit Company
                                            </button>
                                        )}

                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                ) : (
                    <div className="text-center mt-5">
                        <div className="spinner-border text-primary"></div>
                        <p className="mt-3">Loading company details...</p>
                    </div>
                )}
            </div>


        </div>
    )
}
