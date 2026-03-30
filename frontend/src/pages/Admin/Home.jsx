import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

function Home() {

  const [stats,setStats] = useState({})
  const [recentJobs,setRecentJobs] = useState([])

  useEffect(()=>{

    axios.get("http://localhost:5000/api/admin/dashboard")
    .then(res=>{
      setStats(res.data.data)
      setRecentJobs(res.data.recentJobs || [])
    })

  },[])

  return (

    <div className="dashboard">

      <h2 className="page-title">Admin Dashboard</h2>

      {/* Cards */}

      <div className="card-container">

        <div className="card">
          <h4>Total Users</h4>
          <p className="number">{stats.totalUsers}</p>
        </div>

        <div className="card">
          <h4>Total Employers</h4>
          <p className="number">{stats.totalEmployers}</p>
        </div>

        <div className="card">
          <h4>Total Jobs</h4>
          <p className="number">{stats.totalJobs}</p>
        </div>

        <div className="card">
          <h4>Total Applications</h4>
          <p className="number">{stats.totalApplications}</p>
        </div>

      </div>


      {/* Recent Jobs Table */}

      <div className="table-section">

        <div className="table-header">
          <h3>Recent Jobs</h3>
        </div>

        <table className="job-table">

          <thead>
            <tr>
              <th>#</th>
              <th>Job Title</th>
              <th>Company</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>

            {recentJobs.map((job,index)=>(
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{job.title}</td>
                <td>{job.company?.name}</td>
                <td>{job.createdAt?.substring(0,10)}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}

export default Home;