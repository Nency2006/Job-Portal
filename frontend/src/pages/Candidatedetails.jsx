import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CandidateDetails() {
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCandidate();
  }, []);

  const fetchCandidate = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/candidate/candidateById/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const candidate = res.data.candidate || res.data.data || res.data;
      setCandidate(candidate); // Fixed variable
      setLoading(false);
    } catch (error) {
      console.error("Error fetching candidate:", error);
      setLoading(false);
    }
  };

  const isCandidateEmpty = (c) => {
    if (!c) return true;
    return (
      !c.phone &&
      !c.location &&
      (!c.experiences || c.experiences.length === 0) &&
      (!c.skills || c.skills.length === 0) &&
      (!c.education || c.education.length === 0) &&
      (!c.certification || c.certification.length === 0) &&
      (!c.resume || !c.resume.resumeFile)
    );
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Loading candidate details...</p>
      </div>
    );

  if (isCandidateEmpty(candidate))
    return (
      <div className="container text-center mt-5">
        <h4>No Candidate Profile Found</h4>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/candidateForm")}
        >
          Add Your Information
        </button>
      </div>
    );

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow border-0 rounded-4">
            <div className="card-header bg-primary text-center py-3">
              <h4 className="text-white">Candidate Profile</h4>
            </div>
            <div className="card-body p-4">
              {/* Basic Details */}
              <h5 className="text-primary">Basic Details</h5>
              <p>
                <b>Phone:</b> {candidate.phone}
              </p>
              <p>
                <b>Location:</b> {candidate.location}
              </p>

              {/* Experience */}
              <details className="mb-3">
                <summary className="fw-bold text-primary">Experience</summary>
                {candidate.experiences?.length ? (
                  candidate.experiences.map((exp, i) => (
                    <div key={i} className="border p-3 mt-2 rounded">
                      <p>
                        <b>{exp.jobTitle}</b> — {exp.companyName}
                      </p>
                      <p>{exp.employmentType}</p>
                      <p>
                        {exp.startDate?.slice(0, 10)} -{" "}
                        {exp.endDate?.slice(0, 10)}
                      </p>
                      <p>
                        {exp.currentlyWorking ? (
                          <span className="badge bg-success">Currently Working</span>
                        ) : null}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="mt-2">No experience added</p>
                )}
              </details>

              {/* Skills */}
              <details className="mb-3">
                <summary className="fw-bold text-primary">Skills</summary>
                {candidate.skills?.length ? (
                  <div className="mt-2">
                    {candidate.skills.map((skill, i) => (
                      <span key={i} className="badge bg-primary me-2 mb-2">
                        {skill.skillName} ({skill.level})
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2">No skills added</p>
                )}
              </details>

              {/* Education */}
              <details className="mb-3">
                <summary className="fw-bold text-primary">Education</summary>
                {candidate.education?.length ? (
                  candidate.education.map((edu, i) => (
                    <div key={i} className="border p-3 mt-2 rounded">
                      <p>
                        <b>{edu.degree}</b> — {edu.fieldOfStudy}
                      </p>
                      <p>{edu.university}</p>
                      <p>Year: {edu.passingYear}</p>
                    </div>
                  ))
                ) : (
                  <p className="mt-2">No education details</p>
                )}
              </details>

              {/* Certifications */}
              <details className="mb-3">
                <summary className="fw-bold text-primary">Certifications</summary>
                {candidate.certification?.length ? (
                  candidate.certification.map((cert, i) => (
                    <div key={i} className="border p-3 mt-2 rounded">
                      <p>
                        <b>{cert.name}</b>
                      </p>
                      <p>{cert.organization}</p>
                      <p>{cert.issueDate?.slice(0, 10)}</p>
                    </div>
                  ))
                ) : (
                  <p className="mt-2">No certifications</p>
                )}
              </details>

              {/* Resume */}
              <div className="mt-4">
                <h5 className="text-primary">Resume</h5>
                {candidate.resume?.resumeFile ? (
                  <p className="text-success">Resume Uploaded</p>
                ) : (
                  <p>No resume uploaded</p>
                )}
              </div>

              {/* Add more */}
              <div className="text-center mt-4">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => navigate("/addDetailsForm")}
                >
                  Add More Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}