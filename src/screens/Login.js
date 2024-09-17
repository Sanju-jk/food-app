import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  let [credentials, setCredentials] = useState({ email: "", password: "" });

  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); //prevents default submission behaviour of form. it usually submits the form data to server. we are preventing that and adding our logic to send data.

    const URL = "http://localhost:5000/api/loginuser";
    const postData = {
      headers: { 'Content-Type': 'application/json' },
      method: "POST",
      body: JSON.stringify({ email: credentials.email, password: credentials.password }) //sending body with the credentials and capturing it in /createuser endpoint in express
    }

    const response = await fetch(URL, postData);
    const data = await response.json();

    if (!data.success) {
      alert("Enter Valid Credentials");
    }
    else {
      //setting auth token in local storage
      localStorage.setItem("authToken", data.authToken);
      navigate("/");

    }

  }

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })

  }

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} className="m-3 p-4">

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={handleChange} />
          </div>
          <button type="submit" className="m-3 btn btn-warning">Login</button>
          <Link to="/createuser" className="m-3 text-decoration-none">Create New Account</Link>

        </form>
      </div>
    </>)
}
