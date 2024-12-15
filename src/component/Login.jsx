import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../assets/register.css';
import { useAuth } from "./AuthContext";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [role, setRole] = useState('');
    const [errors, setErrors] = useState({ email: '', pass: '', role: '' });
    const [success, setSuccess] = useState('');
    const [userID, setUserID] = useState(null);
    const navigate = useNavigate();
    const { setAuth } = useAuth();

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleClick = () => {
        navigate('/register');
    };

    const handleForgotPassword = () => {
        navigate('/forgotpassword');
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        let emailError = '';
        let passError = '';
        let roleError = '';

        if (!validateEmail(email)) {
            emailError = 'Please enter a valid email address';
        }

        if (!validatePassword(pass)) {
            passError = 'Password must be at least 6 characters';
        }

        if (!role) {
            roleError = 'Please select a role';
        }

        if (emailError || passError || roleError) {
            setErrors({ email: emailError, pass: passError, role: roleError });
            setSuccess('');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/users/login', {
                email,
                password: pass
            });

            const { token, user } = response.data;

           
            if (user) {
                localStorage.setItem('userID', user.id);
                setAuth(true);
                setUserID(user.id);
                setRole(user.role);
                setSuccess('Successfully logged in!');
                setErrors({ email: '', pass: '', role: '' });
            
                setTimeout(() => {
                    if (user.role === 'Organizer') {
                        navigate('/home');
                    } else if (user.role === 'Admin') {
                        navigate('/homeadmin');
                    }
                }, 2000);
            } else {
                setErrors({ email: '', pass: '', role: 'Invalid email or password' });
                setSuccess('');
            }
            
        } catch (error) {
            console.error('Error logging in:', error);
            setErrors({ email: '', pass: '', role: 'Invaild email/password' });
            setSuccess('');
        }
    };

    return (
        <div className="body">
            <div className="login_page">
                <form className="login" onSubmit={handleLoginSubmit}>
                    <h1 className="login_heading">Login</h1>
                    <label htmlFor="email"><FontAwesomeIcon icon={faEnvelope} /> Email</label>
                    <input
                        id="email"
                        placeholder="Enter your Email Address"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <span className="error" style={{ color: 'red' }}>{errors.email}</span>}
                    
                    <label htmlFor="pass"><FontAwesomeIcon icon={faLock} /> Password</label>
                    <input
                        type="password"
                        id="pass"
                        placeholder="Enter your Password"
                        onChange={(e) => setPass(e.target.value)}
                    />
                    {errors.pass && <span className="error" style={{ color: 'red' }}>{errors.pass}</span>}
                    
                   
                   

                    {success && <span className="success" style={{ color: 'green' }}>{success}</span>}
                    
                    <button className="forgot_password" type="button" onClick={handleForgotPassword}>Forgot Password?</button>
                    <button type="submit">Login</button>
                    <button className="button" type="button" onClick={handleClick}>Don't have an account? <span className="nav">Register</span></button>
                </form>
            </div>
        </div>
    );
};

export default Login;
