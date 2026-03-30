import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function JobApplicants() {
    const { jobId } = useParams();
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchApplicants();
    }, []);

    const fetchApplicants = async () => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/applications/applicant/${jobId}`
            );
            setApplicants(res.data.applicants);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (applicationId, status) => {
        try {
            await axios.put(`http://localhost:5000/api/applications/status/${applicationId}`, { status });

            setApplicants((prev) =>
                prev.map((app) =>
                    app._id === applicationId
                        ? { ...app, status }
                        : app
                )
            );
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold">Job Applicants</h3>
                <span className="badge bg-primary">
                    {applicants.length} Applicants
                </span>
            </div>

            <button
                className="btn btn-outline-secondary mb-4"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" />
                </div>
            ) : applicants.length === 0 ? (
                <div className="text-center text-muted py-5">
                    No applicants found for this job
                </div>
            ) : (
                applicants.map((app) => (
                    <div key={app._id} className="card shadow-sm border-0 mb-4 rounded-4">
                        <div className="card-body p-4">

                            {/* Header Section */}
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <h5 className="fw-semibold mb-1">
                                        {app.candidateId?.userId?.name || "No Name"}
                                    </h5>
                                    <p className="text-muted mb-2">
                                        {app.candidateId?.userId?.email}
                                    </p>
                                </div>

                                <span
                                    className={`badge ${app.status === "pending"
                                        ? "bg-warning text-dark"
                                        : app.status === "shortlisted"
                                            ? "bg-success"
                                            : "bg-danger"
                                        }`}
                                >
                                    {app.status}
                                </span>
                            </div>

                            <hr />

                            {/* Candidate Info */}
                            <div className="row">
                                <div className="col-md-6">
                                    <p><strong>Phone:</strong> {app.candidateId?.phone || "-"}</p>
                                    <p><strong>Location:</strong> {app.candidateId?.location || "-"}</p>
                                </div>

                                <div className="col-md-6">
                                    <p>
                                        <strong>Skills:</strong>{" "}
                                        {app.candidateId?.skills?.length > 0
                                            ? app.candidateId.skills.map((s) => s.skillName).join(", ")
                                            : "-"}
                                    </p>
                                </div>
                                <div className="mt-3">
                                    <strong>Experience:</strong>

                                    {app.candidateId?.experiences?.length > 0 ? (
                                        app.candidateId.experiences.map((exp, index) => (
                                            <div key={index} className="mt-2 p-2 bg-light rounded">
                                                <div className="fw-semibold">{exp.jobTitle}</div>
                                                <div className="text-muted">
                                                    {exp.companyName} • {exp.employmentType}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-muted">No experience added</p>
                                    )}
                                </div>
                            </div>

                            {/* Resume Button */}
                            {app.candidateId?.resume?.resumeFile && (
                                <div className="mt-3">
                                    <a
                                        href={`http://localhost:5000/uploads/${app.candidateId.resume.resumeFile}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn btn-outline-primary btn-sm"
                                    >
                                        View Resume
                                    </a>
                                </div>
                            )}

                            {app.status === "pending" && (
                                <div className="mt-3 d-flex gap-2">
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => updateStatus(app._id, "shortlisted")}
                                    >
                                        Shortlist
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => updateStatus(app._id, "rejected")}
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                ))
            )}
        </div>
    );
}