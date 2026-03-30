import {useState, useContext} from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate, Link, useLocation } from "react-router-dom";
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const successMsg = location.state?.message;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            await login(email, password);
            navigate("/dashboard");
        }catch(err){
            setError(err.message);
            setLoading(false);
        }
    };
    return (
        <div className="auth-container">
            <form onSubmit = {handleSubmit} className="auth-form">
                <h2>Login</h2>
                {successMsg && <p className="success-banner">{successMsg}</p>}
                {error && <p className="error">{error}</p>}
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" disabled={loading}>Login</button>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </form>
        </div>
    );
};

export default Login;