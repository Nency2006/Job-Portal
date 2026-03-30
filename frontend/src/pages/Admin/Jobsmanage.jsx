import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

export default function JobsManage() {

  const [jobs,setJobs] = useState([])
    
  useEffect(()=>{

    axios.get("http://localhost:5000/api/admin/jobs")
    .then(res=>{
      setJobs(res.data.jobs)
    })

  },[])

  return (

    <div className="dashboard">
      <div className="page-title">
        <h3>Jobs</h3>
      </div>
    <div className="table-section">


      <table className="job-table">

        <thead>
          <tr>
            <th>#</th>
            <th>Job Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {jobs.map((job,index)=>(

            <tr key={job._id}>
              <td>{index+1}</td>
              <td>{job.title}</td>
              <td>{job.company?.name}</td>
              <td>{job.location}</td>
              <td>{job.salary}</td>
              <td>{job.createdAt?.substring(0,10)}</td>

              <td>
                <button className="delete-btn">Delete</button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
    </div>

  )
}