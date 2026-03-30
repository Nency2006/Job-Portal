import { React, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios'
import Swal from 'sweetalert2';

export default function DetailJob() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [job, setJob] = useState({
    title: "",
    location: "",
    salary: "",
    description: "",
    requirements: ""
  })
  const [company, setCompany] = useState({
    name: "",
    industry: "",
    location: "",
    email: "",
    contactNumber: ""
  })

  const [applied, setApplied] = useState(false);

  useEffect(() => {
    fetchJob();
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
      const jobData = res.data || res.data.job || ""
      setJob(jobData)
      if (jobData.company?._id) {
        getCompanyById(jobData.company._id);
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getCompanyById = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/company/getCompany/${id}`);
      setCompany(res.data.company);

    } catch (error) {
      console.error("Error fetching company details:", error);
    }
  }

  const handleApply = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const role = localStorage.getItem("role");

      if (!userId) {
        navigate("/login");
        return;
      }

      if (role !== "jobseeker") {
        return
      }

      const checkApply = await axios.get(`http://localhost:5000/api/applications/check/${job._id}/${userId}`);

      if (checkApply.data.applied) {
        Swal.fire({
        icon: "info",
        title: "You have already applied for this job"
      })
        setApplied(true);
        return;
      }
      
      const res = await axios.post("http://localhost:5000/api/applications/apply",
        {
          jobId: job._id,
          candidateId: userId
        }
      );
      Swal.fire({
        icon: "success",
        title: "Applied Successfully"
      });

      setApplied(true);

    } catch {
      Swal.fire({
      icon: "error",
      title: error.response?.data?.message || "Something went wrong"
    });
    }
  }



  return (
    <div className="container py-5">

      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="row g-4">

        {/* LEFT — Job Details */}
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-5">

              <h2 className="fw-bold mb-2">{job.title}</h2>
              <p className="text-muted">
                {company.name} • {job.location}
              </p>

              <span className="badge bg-primary me-2">
                {job.jobType}
              </span>

              <span className="badge bg-success">
                ${job.salary}
              </span>

              <hr className="my-4" />

              <h5 className="fw-bold">Position</h5>
              <p>{job.position}</p>

              <h5 className="fw-bold">Job Description</h5>
              <p className="text-secondary">{job.description}</p>

              <h5 className="fw-bold">Requirements</h5>
              <p className="text-secondary">{job.requirements}</p>

            </div>
          </div>
        </div>

        {/* RIGHT — Company Details */}
        <div className="col-lg-4">
          <div className="card shadow border-0 rounded-4">
            <div className="card-body p-4">

              <h5 className="fw-bold mb-3">Company Details</h5>

              <p><strong>Name:</strong> {company.name}</p>
              <p><strong>Industry:</strong> {company.industry}</p>
              <p><strong>Location:</strong> {company.location}</p>
              <p><strong>Email:</strong> {company.email}</p>
              <p><strong>Contact:</strong> {company.contactNumber}</p>

              <button className="btn btn-primary w-100 mt-3" onClick={handleApply} disabled={applied}>
                {applied ? "Applied ✓" : "Apply Now"}
              </button>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}