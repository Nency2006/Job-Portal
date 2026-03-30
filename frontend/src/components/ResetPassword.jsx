import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:5000/api/users/reset-password/${token}`,
        { password }
      );

      Swal.fire({
        title: "Success",
        text: "Password reset successful",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/login");
      });

    } catch (err) {
      Swal.fire("Error", "Invalid or expired link", "error");
    }
  };

  return (
    <section className="vh-100 bg-light d-flex align-items-center justify-content-center">
      <div className="card p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Reset Password</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Reset Password
          </button>
        </form>
      </div>
    </section>
  );
}