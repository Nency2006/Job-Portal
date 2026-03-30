import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

export default function ComapanyManage() {

  const [company,setCompany] = useState([])

  useEffect(()=>{

    axios.get("http://localhost:5000/api/admin/company")
    .then(res=>{
      setCompany(res.data.company)
    })

  },[])

  return (
    <div className="dashboard">
      <div className="page-title">
        <h3>Companies</h3>
      </div>
    <div className="table-section">

      <table className="job-table">

        <thead>
          <tr>
            <th>#</th>
            <th>Company Name</th>
            <th>Industry</th>
            <th>Location</th>
            <th>Email</th>
            <th>Contact No.</th>
            <th>User</th>
          </tr>
        </thead>

        <tbody>

          {company.map((item,index)=>(

            <tr key={item._id}>
              <td>{index+1}</td>
              <td>{item.name}</td>
              <td>{item.industry}</td>
              <td>{item.location}</td>
              <td>{item.email}</td>
              <td>{item.contactNumber}</td>
              <td>{item.userId?.name}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  </div>
  )
}