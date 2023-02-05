import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

  let navigate = useNavigate();
  const [input, setInput] = useState({ name: "",email: "", password: "" })

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value }) //1st arg says the properties inside note will remain as-it-is, and overwrite 2nd arg i.e: trgt.name (ex. email) with its value trgt.value (ex. 'Gmail@mail.com')
  }

  const handleSubmit = async (e) => {
    e.preventDefault() // prevent page from reloading

    const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: input.name, email: input.email, password: input.password })
    });
    const data = await response.json();
    console.log("data: ",data)
    if(data.success){
        //save token and redirect
        localStorage.setItem('token', data.authToken);
        navigate("/login");
        props.showAlert("Account created successfully","success")
    }
    else{
        props.showAlert("Account already exists!","warning")
    }
}

  return (
    <div className="container mt-3">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={handleChange} required minLength={4}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={handleChange} required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password"  onChange={handleChange} required minLength={6}/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={handleChange} required minLength={6} />
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div>
  )
}

export default Signup