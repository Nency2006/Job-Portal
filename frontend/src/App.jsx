import { useState } from 'react';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLayout from './pages/UserLayout';
import Register from './pages/Register';
import Login from './pages/Login';
import CreateJob from './pages/CreateJob';
import Company from './pages/CreateCompany';
import Jobs from './pages/Jobs';
import Home from './pages/Home';
import Logout from './pages/Logout';
import CompanyDetails from './pages/CompanyDetails';
import ProfileDetails from './pages/ProfileDetails';
import JobsEdit from './pages/JobsEdit'
import Updatepage from './pages/Updatepage';
import DetailJob from './pages/DetailJob';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import CandidateForm from './pages/CandidateForm';
import CandidateDetails from './pages/Candidatedetails';
import JobApplicants from './pages/JobApplicants';
import MyApplications from './pages/MyApplications';
import AddinfoForm from './pages/AddinfoForm';

import AdminHome from './pages/Admin/Home';
import AdminLayout from './pages/Admin/AdminLayout';
import UserManage from './pages/Admin/UserManage';
import JobsManage from './pages/Admin/Jobsmanage';
import ComapanyManage from './pages/Admin/CompanyManage';
import ApplicationManage from './pages/Admin/ApplicationManage'


function App() {
  return (
    <Router>

      <Routes>
        <Route element={<UserLayout />}>

          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/create-job" element={<CreateJob />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Company" element={<Company />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/company-details" element={<CompanyDetails />} />
          <Route path="/profile" element={<ProfileDetails />} />
          <Route path="/jobs-edit" element={<JobsEdit />} />
          <Route path="/update-jobs/:id" element={<Updatepage />} />
          <Route path="/job-details/:id" element={<DetailJob />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/candidateForm" element={<CandidateForm />} />
          <Route path="/addDetailsForm" element={<AddinfoForm />} />
          <Route path="/candidateDetails" element={<CandidateDetails />} />
          <Route path="/employer/applicants/:jobId" element={<JobApplicants />} />
          <Route path="/application/:candidateId" element={<MyApplications />} />

        </Route>

        {/* Admin route */}

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path='/admin/users' element={<UserManage/>}/>
          <Route path='/admin/jobs' element={<JobsManage/>}/>
          <Route path='/admin/companies' element={<ComapanyManage/>}/>
          <Route path='/admin/applications' element={<ApplicationManage/>}/>
        </Route>


      </Routes>
    </Router>
  )
}

export default App;
