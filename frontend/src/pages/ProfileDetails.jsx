import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2';

export default function ProfileDetails() {
    const [profile, setProfile] = useState(null);
    const [isEdit, setEdit] = useState(false);
    const [userData, setUserData] = useState({
        name: "",
        email: ""
    })

    useEffect(() => {
        const fetchProfile = async () => {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                console.warn('No userId in localStorage');
                return;
            }
            await getProfile(userId);

        }
        fetchProfile();
    }, [])

    const getProfile = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/users/${id}`);
            const user = res.data.user || res.data.profile || res.data;
            setProfile(user);
            setUserData({
                name: user.name,
                email: user.email
            });
            return user;

        } catch (error) {
            console.error("Error fetching profile details:", error);
        }
    }

    const updateProfile = async (id) => {
        try {
            const userId = localStorage.getItem("userId");
            await axios.put(`http://localhost:5000/api/users/updateUser/${userId}`, userData);

            Swal.fire({
                title: "success",
                icon: "success",
                text : "Profile updated successfully",
                confirmButtonText : "Ok"
            }).then(()=>{
                setProfile({ ...profile, ...userData })
                setEdit(false);
            });
        }
        catch (error) {
            console.error("Update error:", error);
        }

    }
    return (
        <div>
            <div className="container py-5">
                {profile ? (
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-8">

                            <div className="card shadow border-0 rounded-4">

                                {/* Header */}
                                <div className="card-header bg-primary text-white text-center rounded-top-4 py-4">
                                    <i className="bi bi-person-circle fs-1"></i>
                                    <h4 className="mt-2 mb-0">Profile Details</h4>
                                </div>

                                {/* Body */}
                                <div className="card-body p-4">

                                    <div className="mb-3">
                                        <label className="text-muted">Full Name</label>
                                        {isEdit ? (
                                            <input type='text' className='form-control' value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                                        ) : (
                                            <div className="fw-semibold fs-5">{profile.name}</div>
                                        )}
                                    </div>

                                    <hr />

                                    <div className="mb-3">
                                        <label className="text-muted">Email Address</label>
                                        {isEdit ? (
                                            <input type='text' className='form-control' value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                                        ) : (
                                            <div className="fw-semibold">{profile.email}</div>
                                        )}

                                    </div>

                                    <hr />

                                    <div className="mb-4">
                                        <label className="text-muted">Role</label>
                                        <div className="fw-semibold text-capitalize">
                                            {profile.role}
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="d-grid gap-2">
                                        {isEdit ? (
                                            <button
                                                className="btn btn-success"
                                                onClick={updateProfile}
                                            >
                                                Save Changes
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-outline-primary"
                                                onClick={() => setEdit(true)}
                                            >
                                                Edit Profile
                                            </button>
                                        )}

                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                ) : (
                    <div className="text-center mt-5">
                        <div className="spinner-border text-primary"></div>
                        <p className="mt-3">Loading profile details...</p>
                    </div>
                )}
            </div>

        </div>
    )
}
