import React from 'react'
import './Register.css'
import { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Dashboard from './Dashboard'

function Register() {
    const [formData, setFormData] = useState({
        fullName:'',
        email:'',
        password:''
    })

    const navigate = useNavigate();

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }
     const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const res = await axios.post('https://localhost:5000/api/auth/register', formData, { withCredentials: true })
            console.log(res.data);

            navigate("/dashboard");
        } 
        catch (error) {
            console.log(error.response?.data)
            setError(error.response.data.message)
        }
    }

    return (
        <div className='Rcontainer'>
            <form onSubmit={handleSubmit}>
                <div className='section'>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name = "fullName" value={formData.fullName} onChange={handleChange}/>
                </div>
                <div className='section'>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name = "email" value={formData.email} onChange={handleChange}/>
                </div>
                <div className='section'>
                    <label htmlFor="password">Password</label>
                    <input type="text" id="password" name = "password" value={formData.password} onChange={handleChange}/>
                </div>
            <button type='submit'>Sign Up</button>

            {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default Register
