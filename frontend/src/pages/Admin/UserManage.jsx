import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

export default function UserManage() {

  const [users,setUsers] = useState([])

  useEffect(()=>{

    axios.get("http://localhost:5000/api/admin/users")
    .then(res=>{
      setUsers(res.data.users)
    })

  },[])

  return (
    <div className="dashboard">
      <div className="page-title">
        <h3>Users</h3>
      </div>
    <div className="table-section">

      <table className="job-table">

        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user,index)=>(

            <tr key={user._id}>
              <td>{index+1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.createdAt?.substring(0,10)}</td>

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