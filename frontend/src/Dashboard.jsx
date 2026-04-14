import { useEffect, useState } from "react";
import axios from "axios";
import './Dashboard.css'
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [name, setName] = useState("");

    const navigate = useNavigate();

    const handleLogout = async () => {
    await axios.post("https://authproject-3pyd.onrender.com/api/auth/logout", {}, {
        withCredentials: true
    });
        navigate("/login", { replace: true });
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(
                    "https://authproject-3pyd.onrender.com/api/auth/dashboard",
                    { withCredentials: true }
                );
                console.log("hello", res);
                setName(res.data.fullName);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, []);
    return (
        <div className="dcontainer">

            <div className="container">
                <button onClick={() => navigate("/register")}>Register</button>
                <button onClick={() => navigate("/login")}>Login</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <h1>Welcome {name}</h1>
        </div>
    );
}

export default Dashboard;