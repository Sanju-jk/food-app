import { useState } from "react";
import { Link } from "react-router-dom"

export default function Signup() {
    let [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });


    const handleSubmit = async (event) => {
        event.preventDefault(); //prevents default submission behaviour of form. it usually submits the form data to server. we are preventing that and adding our logic to send data.

        const URL = "http://localhost:5000/api/createuser";
        const postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation }) //sending body with the credentials and capturing it in /createuser endpoint in express
        }

            const response = await fetch(URL, postData);
            const data = await response.json();
            console.log(data);

            if (!data.success) {
                alert("Enter Valid Credentials");
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
                        <label htmlFor="username" className="form-label">User Name</label>
                        <input type="text" className="form-control" id="username" name="name" value={credentials.name} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={handleChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">Address</label>
                        <input type="text" className="form-control" id="location" name="geolocation" value={credentials.geolocation} onChange={handleChange} />
                    </div>


                    <button type="submit" className="m-3 btn btn-warning">Register</button>
                    {/*link to redirect to login page if user is already signed in */}
                    <Link to="/login" className="m-3 text-decoration-none">Already a User?</Link>
                </form>
            </div>
        </>
    )
}
