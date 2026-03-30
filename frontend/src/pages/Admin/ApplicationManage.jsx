import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Applications() {

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {

      const res = await axios.get("http://localhost:5000/api/admin/application");

      setApplications(res.data.applications);

    } catch (error) {
      console.log(error);
    }
  };

  return (
   <div className="dashboard">
      <div className="page-title">
        <h3>Applications</h3>
      </div>
    <div className="table-section">


      <table className="job-table">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Candidate</th>
            <th>Company</th>
            <th>Employer</th>
            <th>Status</th>
            <th>Applied Date</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr key={app._id}>

              <td>{app.jobId?.title}</td>
            
              <td>{app.candidateId?.userId?.name}</td>
              <td>{app.jobId?.company?.name}</td>
              <td>{app.employerId?.name}</td>

              <td>
                <span className={`badge 
                    ${app.status === "pending" ? "bg-warning" :
                    app.status === "shortlisted" ? "bg-success" :
                      "bg-danger"}`}>
                  {app.status}
                </span>
              </td>

              <td>
                {new Date(app.appliedAt).toLocaleDateString()}
              </td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  </div>
  );
}