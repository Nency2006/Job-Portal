import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CandidateForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: localStorage.getItem("userId"),
    phone: "",
    location: "",
    experiences: [
      { jobTitle: "", companyName: "", employmentType: "", startDate: "", endDate: "", currentlyWorking: false }
    ],
    skills: [{ skillName: "", level: "" }],
    education: [{ degree: "", fieldOfStudy: "", university: "", passingYear: "", grade: "" }],
    certification: [{ name: "", organization: "", issueDate: "" }],
    resume: null
  });

  // Check if user has a candidate profile
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userId = localStorage.getItem("userId");

    if (!token) {
      navigate("/login");
      return;
    }

    if (role !== "jobseeker") {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Only jobseeker users can create candidate profile"
      }).then(() => navigate("/"));
      return;
    }

    // Check if candidate profile already exists
    const checkCandidate = async () => {
      try {
        if (!userId) return;
        const res = await axios.get(`http://localhost:5000/api/candidate/candidateById/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const candidateData = res.data.candidate || res.data;
        if (candidateData?._id) {
          localStorage.setItem("candidateId", candidateData._id);
          navigate("/jobs"); // redirect to jobs page if profile exists
        }
      } catch (error) {
        console.log("No candidate found → stay on page");
      }
    };

    checkCandidate();
  }, [navigate]);

  // ===== Basic field change =====
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ===== Nested array change =====
  const handleNestedChange = (section, index, e) => {
    const updated = [...formData[section]];
    updated[index][e.target.name] = e.target.value;
    setFormData({ ...formData, [section]: updated });
  };

  const handleCheckbox = (index, e) => {
    const updated = [...formData.experiences];
    updated[index].currentlyWorking = e.target.checked;
    setFormData({ ...formData, experiences: updated });
  };

  // ===== Add more items =====
  const addExperience = () => setFormData({ ...formData, experiences: [...formData.experiences, { jobTitle: "", companyName: "", employmentType: "", startDate: "", endDate: "", currentlyWorking: false }] });
  const addSkill = () => setFormData({ ...formData, skills: [...formData.skills, { skillName: "", level: "" }] });
  const addEducation = () => setFormData({ ...formData, education: [...formData.education, { degree: "", fieldOfStudy: "", university: "", passingYear: "", grade: "" }] });
  const addCertification = () => setFormData({ ...formData, certification: [...formData.certification, { name: "", organization: "", issueDate: "" }] });

  // ===== Resume file change =====
  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] || null });
  };

  // ===== Submit =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const data = new FormData();
      data.append("userId", formData.userId);
      data.append("phone", formData.phone);
      data.append("location", formData.location);
      data.append("experiences", JSON.stringify(formData.experiences));
      data.append("skills", JSON.stringify(formData.skills));
      data.append("education", JSON.stringify(formData.education));
      data.append("certification", JSON.stringify(formData.certification));
      if (formData.resume) data.append("resume", formData.resume);

      const res = await axios.post("http://localhost:5000/api/candidate/addCandidate", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      const candidate = res.data.candidate || res.data.data || res.data;
      localStorage.setItem("candidateId", candidate._id);

      Swal.fire({ icon: "success", title: "Profile Created Successfully" }).then(() => navigate("/jobs"));
    } catch (err) {
      console.log(err);
      Swal.fire({ icon: "error", title: "Error saving profile", text: err.response?.data?.message || err.message });
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Candidate Profile</h2>
        <form onSubmit={handleSubmit}>
          {/* BASIC DETAILS */}
          <div className="card p-3 mb-4">
            <h5>Basic Details</h5>
            <input className="form-control mb-3" placeholder="Phone" name="phone" value={formData.phone} onChange={handleChange} />
            <input className="form-control" placeholder="Location" name="location" value={formData.location} onChange={handleChange} />
          </div>

          {/* EXPERIENCE */}
          <div className="card p-3 mb-4">
            <h5>Experience</h5>
            {formData.experiences.map((exp, i) => (
              <div key={i} className="border p-3 mb-3">
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <input className="form-control" placeholder="Job Title" name="jobTitle" value={exp.jobTitle} onChange={(e) => handleNestedChange("experiences", i, e)} />
                  </div>
                  <div className="col-md-6 mb-2">
                    <input className="form-control" placeholder="Company" name="companyName" value={exp.companyName} onChange={(e) => handleNestedChange("experiences", i, e)} />
                  </div>
                  <div className="col-md-6 mb-2">
                    <input className="form-control" placeholder="Employment Type" name="employmentType" value={exp.employmentType} onChange={(e) => handleNestedChange("experiences", i, e)} />
                  </div>
                  <div className="col-md-3 mb-2">
                    <input type="date" className="form-control" name="startDate" value={exp.startDate} onChange={(e) => handleNestedChange("experiences", i, e)} />
                  </div>
                  <div className="col-md-3 mb-2">
                    <input type="date" className="form-control" name="endDate" value={exp.endDate} onChange={(e) => handleNestedChange("experiences", i, e)} />
                  </div>
                  <div className="col-12">
                    <div className="form-check">
                      <input type="checkbox" className="form-check-input" checked={exp.currentlyWorking} onChange={(e) => handleCheckbox(i, e)} />
                      <label className="form-check-label">Currently Working</label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={addExperience}>Add Experience</button>
          </div>

          {/* SKILLS */}
          <div className="card shadow-sm p-3 mb-4">
            <h5>Skills</h5>
            {formData.skills.map((skill, i) => (
              <div key={i} className="row mb-3">
                <div className="col-md-6">
                  <input className="form-control" placeholder="Skill" name="skillName" value={skill.skillName} onChange={(e) => handleNestedChange("skills", i, e)} />
                </div>
                <div className="col-md-6">
                  <select className="form-control" name="level" value={skill.level} onChange={(e) => handleNestedChange("skills", i, e)}>
                    <option value="">Select Level</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={addSkill}>Add Skill</button>
          </div>

          {/* RESUME */}
          <div className="card p-3 mb-4">
            <h5>Resume</h5>
            <input type="file" className="form-control" onChange={(e) => setFormData({ ...formData, resume: e.target.files[0] })} />
          </div>

          <button className="btn btn-primary w-100">Save Profile</button>
        </form>
      </div>
    </div>
  );
};

export default CandidateForm;