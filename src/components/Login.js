import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = (props) => {

    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault() // prevent page from reloading

        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const data = await response.json();
        console.log("data: ",data)
        if(data.success){
            //save token and redirect
            localStorage.setItem('token', data.authToken);
            localStorage.setItem('name', data.name);
            navigate("/");
            props.showAlert("login Successfully", "success")
        }
        else{
            props.showAlert("Invalid Credentials!", "danger")
        }
    }

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value}) //1st arg says the properties inside note will remain as-it-is, and overwrite 2nd arg i.e: trgt.name (ex. email) with its value trgt.value (ex. 'Gmail@mail.com')
    }

    return (
        <div className="container mt-3">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={handleChange} required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={handleChange} required/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login