import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const candidateId = localStorage.getItem("candidateId");
      const res = await axios.get(
        `http://localhost:5000/api/applications/myApplications/${candidateId}`
      );
      setApplications(res.data.applications);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <span className="badge bg-warning text-dark px-3 py-2">Pending</span>;
      case "shortlisted":
        return <span className="badge bg-success px-3 py-2">Shortlisted</span>;
      case "rejected":
        return <span className="badge bg-danger px-3 py-2">Rejected</span>;
      default:
        return null;
    }
  };

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="mb-5 text-center">
        <h2 className="fw-bold">My Job Applications</h2>
        <p className="text-muted">Check the status of the jobs you've applied to</p>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-5">
          <h5 className="mb-3">No Applications Yet</h5>
          <p className="text-muted mb-4">You haven't applied for any jobs yet.</p>
          <button className="btn btn-primary" onClick={() => navigate("/jobs")}>
            Browse Jobs
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {applications.map((app) => (
            <div key={app._id} className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm rounded-4">
                <div className="card-header bg-primary text-white rounded-top">
                  <h5 className="mb-0">{app.jobId?.title}</h5>
                  <small>{app.jobId?.company?.name}</small>
                </div>
                <div className="card-body d-flex flex-column">
                  <p className="text-muted mb-1">
                    <i className="bi bi-geo-alt-fill me-1"></i>
                    {app.jobId?.company?.location}
                  </p>
                  <p className="mb-1">
                    <strong>Salary:</strong> {app.jobId?.salary || "Not specified"}
                  </p>
                  <p className="mb-3">
                    <strong>Type:</strong> {app.jobId?.jobType || "Full-time"}
                  </p>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <small className="text-muted d-block">Status</small>
                      {getStatusBadge(app.status)}
                    </div>
                    <div className="text-end">
                      <small className="text-muted d-block">Applied</small>
                      <small>{new Date(app.appliedAt).toLocaleDateString()}</small>
                    </div>
                  </div>

                  <button
                    className="btn btn-outline-primary mt-auto"
                    onClick={() => navigate(`/job-details/${app.jobId?._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}