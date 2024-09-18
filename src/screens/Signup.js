import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

export default function Signup() {
  let [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents default form submission

    const URL = "http://localhost:5000/api/createuser";
    const postData = {
      headers: { 'Content-Type': 'application/json' },
      method: "POST",
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation
      })
    };

    const response = await fetch(URL, postData);
    const data = await response.json();
    console.log(data);

    if (!data.success) {
      alert("Enter Valid Credentials");
    }
  };

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg">
            <div className="card-body p-5">
              <h3 className="text-center mb-4">Sign Up</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">User Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="name"
                    value={credentials.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
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
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
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
                    placeholder="Create a password"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    name="geolocation"
                    value={credentials.geolocation}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-warning btn-block">Register</button>
                </div>
              </form>
              <div className="text-center mt-3">
                <Link to="/login" className="text-decoration-none">Already a User? Log in</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
