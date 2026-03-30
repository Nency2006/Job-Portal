import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';


import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

export default function Navbar() {
    const [hasCandidateProfile, setHasCandidateProfile] = useState(false);

    useEffect(() => {

        checkCandidate();
    }, []);
    const checkCandidate = async () => {
            try {
                const userId = localStorage.getItem("userId");

                const res = await axios.get(
                    `http://localhost:5000/api/candidate/candidateById/${userId}`
                );

                if (res.data.data) {
                    setHasCandidateProfile(true); // already filled
                }

            } catch (err) {
                setHasCandidateProfile(false); // not filled
            }
        };
    
    
    const [anchorEl, setAnchorEl] = useState(null);
    const [activetab, setActiveTab] = useState(0);
    const isLogin = localStorage.getItem("userId");
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        if (document.activeElement) {
            document.activeElement.blur()
        }
    };
    const role = localStorage.getItem("role");
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-primary navbar-dark position-relative" style={{ zIndex: 1000 }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Job-Portal</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className={`nav-link ${activetab === 0 ? 'active' : ''}`} onClick={() => setActiveTab(0)} aria-current="page" to="/">Home</Link>
                            <Link className={`nav-link ${activetab === 1 ? 'active' : ''}`} onClick={() => setActiveTab(1)} to="/jobs">Jobs</Link>
                            {role === "employer" ? (
                                <Link className={`nav-link ${activetab === 2 ? 'active' : ''}`} onClick={() => setActiveTab(2)} to="/create-job">Post a Job</Link>
                            ) : null}

                            {!isLogin ? (
                                <Link className={`nav-link ${activetab === 3 ? 'active' : ''}`} onClick={() => setActiveTab(3)} to="/register">Sign up</Link>
                            ) : null}

                        </div>
                        {/* <div className='ms-auto'>
                        <i className="bi bi-person-circle text-white">
                            
                        </i>
                        </div> */}

                        {/* <div className="dropdown-center ms-auto">
                            <span className="dropdown-toggle text-white" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-person-circle text-white"></i> profile
                            </span>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><Link className="dropdown-item" to="/profile"> <i className="bi bi-person-circle"></i> My Profile</Link></li>
                                {role === "employer" ? (
                                    <li><Link className="dropdown-item" to="/company-details"><i className="bi bi-building"></i>Company Details</Link></li>
                                ) : null}

                                <li><Link className="dropdown-item" to="/logout"><i className="bi bi-box-arrow-right"></i> Log out</Link></li>
                            </ul>
                        </div> */}

                        <div className="ms-auto">
                            <span
                                className="text-white"
                                onClick={handleClick}
                                style={{ cursor: 'pointer' }}
                            >
                                <i className="bi bi-person-circle text-white"></i> profile
                            </span>
                        </div>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            slotProps={{
                                paper: {
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&::before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >

                            <MenuItem component={Link} to="/profile" onClick={handleClose}>
                                <Avatar /> Profile
                            </MenuItem>

                            {role === "jobseeker" && (
                                <MenuItem
                                    component={Link}
                                    //to={hasCandidateProfile === false ? "/candidateForm" : "/candidateDetails" }
                                    to="/candidateDetails"
                                    onClick={handleClose}
                                >
                                    <Avatar /> Other Details
                                </MenuItem>
                            )}

                            {role === "employer" ? (

                                <MenuItem component={Link} to="/company-details" onClick={handleClose}>
                                    <Avatar /> Company Details
                                </MenuItem>
                            ) : null}

                            <Divider />

                            {role === "employer" ? (
                                <MenuItem
                                    component={Link}
                                    to="/jobs-edit"
                                    onClick={handleClose}
                                >
                                    <ListItemIcon>
                                        <Settings fontSize="small" />
                                    </ListItemIcon>
                                    Job Settings
                                </MenuItem>
                            ) : null}

                            {role === "jobseeker" ? (
                                <MenuItem
                                    component={Link}
                                    to={`/application/${localStorage.getItem("userId")}`}
                                    onClick={handleClose}
                                >
                                    <ListItemIcon>
                                        <Settings fontSize="small" />
                                    </ListItemIcon>
                                    My Applications
                                </MenuItem>
                            ) : null}


                            <MenuItem component={Link} to="/logout" onClick={handleClose}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>

                </div>
            </nav>
        </div>
    )
}

