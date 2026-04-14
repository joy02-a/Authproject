import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import Dashboard from './Dashboard';


function Login() {
    const [formdata, setFormData] = useState({
        email:'',
        password:''
    })

    const[error, setError] = useState('')

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formdata,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formdata)
            console.log(res.data)
            navigate("/dashboard");
        } catch (error) {
            console.log(error.response.data.message);
            setError(error.response.data.message)
        }
    }
    return (
        <div className='Rcontainer'>
            <form onSubmit={handleSubmit}>
                <div className='section'>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name = "email" value={formdata.email} onChange={handleChange}/>
                </div>
                <div className='section'>
                    <label htmlFor="password">Password</label>
                    <input type="text" id="password" name = "password" value={formdata.password} onChange={handleChange}/>
                </div>
                <button>Login</button>

                {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default Login;
