import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

function AdminLayout(){

  return(

    <div>

      <AdminNavbar />

      <div style={{padding:"20px"}}>
        <Outlet />
      </div>

    </div>

  )

}

export default AdminLayout;