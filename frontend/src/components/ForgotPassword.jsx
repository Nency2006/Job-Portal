import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/users/forgot-password", {
        email,
      });

      Swal.fire({
        title: "Success",
        text: "Reset link sent to your email",
        icon: "success",
        confirmButtonText: "OK",
      });

      setEmail("");
    } catch (err) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <section className="vh-100 bg-light d-flex align-items-center justify-content-center">
      <div className="card p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Forgot Password</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Send Reset Link
          </button>
        </form>
      </div>
    </section>
  );
}