import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

const AddinfoForm = () => {

    const [formData, setFormData] = useState({
        userid: localStorage.getItem("userId"),
        phone: "",
        location: "",
        experiences: [{
            jobTitle: "",
            companyName: "",
            employmentType: "",
            startDate: "",
            endDate: "",
            currentlyWorking: false
        }],
        skills: [{ skillName: "", level: "" }],
        education: [{
            degree: "",
            fieldOfStudy: "",
            university: "",
            passingYear: "",
            grade: ""
        }],
        certification: [{
            name: "",
            organization: "",
            issueDate: ""
        }],
        resume: { resumeFile: "" }
    });

      // ===== GET CANDIDATE DATA =====
      useEffect(() => {

        const candidateId = localStorage.getItem("candidateId");

        if (candidateId) {

          const fetchCandidate = async () => {

            try {

              const token = localStorage.getItem("token");

              const res = await axios.get(
                `http://localhost:5000/api/candidate/candidateById/${candidateId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }
              );

              setFormData(res.data.candidate);

            } catch (err) {
              console.log(err);
            }

          };

          fetchCandidate();
        }

      }, []);

   

    // ===== NESTED CHANGE =====
    const handleNestedChange = (section, index, e) => {

        const updated = [...formData[section]];
        updated[index][e.target.name] = e.target.value;

        setFormData({
            ...formData,
            [section]: updated
        });

    };

    // ===== CHECKBOX =====
    const handleCheckbox = (index, e) => {

        const updated = [...formData.experiences];
        updated[index].currentlyWorking = e.target.checked;

        setFormData({
            ...formData,
            experiences: updated
        });

    };

    // ===== ADD MORE EXPERIENCE =====
    const addExperience = () => {

        setFormData({
            ...formData,
            experiences: [
                ...formData.experiences,
                {
                    jobTitle: "",
                    companyName: "",
                    employmentType: "",
                    startDate: "",
                    endDate: "",
                    currentlyWorking: false
                }
            ]
        });

    };

    // ===== ADD SKILL =====
    const addSkill = () => {

        setFormData({
            ...formData,
            skills: [
                ...formData.skills,
                { skillName: "", level: "" }
            ]
        });

    };

    // ===== ADD EDUCATION =====
    const addEducation = () => {

        setFormData({
            ...formData,
            education: [
                ...formData.education,
                {
                    degree: "",
                    fieldOfStudy: "",
                    university: "",
                    passingYear: "",
                    grade: ""
                }
            ]
        });

    };

    // ===== ADD CERTIFICATION =====
    const addCertification = () => {

        setFormData({
            ...formData,
            certification: [
                ...formData.certification,
                {
                    name: "",
                    organization: "",
                    issueDate: ""
                }
            ]
        });

    };

    // ===== SUBMIT =====
    const handleSubmit = async (e) => {

       e.preventDefault(); 
       try { 
        const token = localStorage.getItem("token"); 
        const candidateId = localStorage.getItem("candidateId"); 
        let res; 
        if (candidateId) 
            { 
                res = await axios.put(`http://localhost:5000/api/candidate/addDetails/${candidateId}`,
                     formData, 
                    { 
                        headers: { 
                            Authorization: `Bearer ${token} `
                        } 
                    } 
                
                ); 
                
                Swal.fire({ icon: "success", title: "Profile Updated Successfully" }); 
            }
        }

        catch (err) {

            console.log(err);

            Swal.fire({
                icon: "error",
                title: "Error saving profile"
            });

        }

    };

    return (

        <div className="container mt-5 mb-5">

            <div className="card shadow-lg p-4">

                <h2 className="text-center mb-4">
                    Candidate Profile
                </h2>

                <form onSubmit={handleSubmit}>

                    {/* EXPERIENCE */}

                    <div className="card p-3 mb-4">

                        <h5>Experience</h5>

                        {formData.experiences.map((exp, i) => (
                            <div key={i} className="border p-3 mb-3">

                                <div className="row">

                                    <div className="col-md-6 mb-2">
                                        <input
                                            className="form-control"
                                            placeholder="Job Title"
                                            name="jobTitle"
                                            onChange={(e) => handleNestedChange("experiences", i, e)}
                                        />
                                    </div>

                                    <div className="col-md-6 mb-2">
                                        <input
                                            className="form-control"
                                            placeholder="Company"
                                            name="companyName"
                                            onChange={(e) => handleNestedChange("experiences", i, e)}
                                        />
                                    </div>

                                    <div className="col-md-6 mb-2">
                                        <input
                                            className="form-control"
                                            placeholder="Employment Type"
                                            name="employmentType"
                                            onChange={(e) => handleNestedChange("experiences", i, e)}
                                        />
                                    </div>

                                    <div className="col-md-3 mb-2">
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="startDate"
                                            onChange={(e) => handleNestedChange("experiences", i, e)}
                                        />
                                    </div>

                                    <div className="col-md-3 mb-2">
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="endDate"
                                            onChange={(e) => handleNestedChange("experiences", i, e)}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                onChange={(e) => handleCheckbox(i, e)}
                                            />
                                            <label className="form-check-label">
                                                Currently Working
                                            </label>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={addExperience}
                        >
                            Add Experience
                        </button>
                    </div>


                    {/* ===== SKILLS ===== */}
                    <div className="card shadow-sm p-3 mb-4">
                        <h5>Skills</h5>

                        {formData.skills.map((skill, i) => (
                            <div key={i} className="row mb-3">

                                <div className="col-md-6">
                                    <input
                                        className="form-control"
                                        placeholder="Skill"
                                        name="skillName"
                                        onChange={(e) => handleNestedChange("skills", i, e)}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <select
                                        className="form-control"
                                        name="level"
                                        onChange={(e) => handleNestedChange("skills", i, e)}
                                    >
                                        <option>Select Level</option>
                                        <option>Beginner</option>
                                        <option>Intermediate</option>
                                        <option>Advanced</option>
                                    </select>
                                </div>

                            </div>
                        ))}

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={addSkill}
                        >
                            Add Skill
                        </button>

                    </div>

                    {/* EDUCATION */}

                    <div className="card shadow-sm p-3 mb-4">
                        <h5>Education</h5>

                        {formData.education.map((edu, i) => (
                            <div key={i} className="row mb-3">

                                <div className="col-md-6">
                                    <input
                                        className="form-control"
                                        placeholder="Degree"
                                        name="degree"
                                        onChange={(e) => handleNestedChange("education", i, e)}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <input
                                        className="form-control"
                                        placeholder="Field of Study"
                                        name="fieldOfStudy"
                                        onChange={(e) => handleNestedChange("education", i, e)}
                                    />
                                </div>

                                <div className="col-md-6 mt-2">
                                    <input
                                        className="form-control"
                                        placeholder="University"
                                        name="university"
                                        onChange={(e) => handleNestedChange("education", i, e)}
                                    />
                                </div>

                                <div className="col-md-3 mt-2">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Year"
                                        name="passingYear"
                                        onChange={(e) => handleNestedChange("education", i, e)}
                                    />
                                </div>

                                <div className="col-md-3 mt-2">
                                    <input
                                        className="form-control"
                                        placeholder="Grade"
                                        name="grade"
                                        onChange={(e) => handleNestedChange("education", i, e)}
                                    />
                                </div>

                            </div>
                        ))}
                    
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={addEducation}
                        >
                            Add Education
                        </button>

                    </div>

                    {/* CERTIFICATION */}

                    <div className="card shadow-sm p-3 mb-4">
                        <h5>Certifications</h5>

                        {formData.certification.map((cert, i) => (
                            <div key={i} className="row mb-3">

                                <div className="col-md-6">
                                    <input
                                        className="form-control"
                                        placeholder="Name"
                                        name="name"
                                        onChange={(e) => handleNestedChange("certification", i, e)}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <input
                                        className="form-control"
                                        placeholder="Organization"
                                        name="organization"
                                        onChange={(e) => handleNestedChange("certification", i, e)}
                                    />
                                </div>

                                <div className="col-md-6 mt-2">
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="issueDate"
                                        onChange={(e) => handleNestedChange("certification", i, e)}
                                    />
                                </div>

                            </div>
                        ))}

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={addCertification}
                        >
                            Add Certification
                        </button>

                    </div>

                    {/* RESUME */}

                    <div className="card p-3 mb-4">

                        <h5>Resume</h5>

                        <input
                            type="file"
                            className="form-control"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    resume: {
                                        resumeFile: e.target.files[0]?.name
                                    }
                                })
                            }
                        />

                    </div>

                    <button className="btn btn-primary w-100">
                        Save Profile
                    </button>

                </form>

            </div>

        </div>

    );

};

export default AddinfoForm;