import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

export default function Login() {
  let [credentials, setCredentials] = useState({ email: "", password: "" });

  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents default form submission

    const URL = "http://localhost:5000/api/loginuser";
    const postData = {
      headers: { 'Content-Type': 'application/json' },
      method: "POST",
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    }

    const response = await fetch(URL, postData);
    const data = await response.json();

    if (!data.success) {
      alert("Enter Valid Credentials");
    } else {
      // Setting auth token and email in local storage
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", data.authToken);
      navigate("/");
    }
  }

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg">
            <div className="card-body p-5">
              <h3 className="text-center mb-4">Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-warning btn-block">Login</button>
                </div>
              </form>
              <div className="text-center mt-3">
                <Link to="/createuser" className="text-decoration-none">Create New Account</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
