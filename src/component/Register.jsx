import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../assets/register1.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const Register = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [mobile, setMobile] = useState('');
    const [role, setRole] = useState('');
    const [errors, setErrors] = useState({ name: '', email: '', pass: '', confirmPass: '', mobile: '', role: '' });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => 
        {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const validatePassword = (password) => 
        {
        return password.length >= 6;
    };

    const validateName = (name) => {
        return name.trim().length > 3;
    };

    const validateMobile = (mobile) => {
        const re = /^[789]\d{9}$/;
        return re.test(mobile);
    };

    const validateConfirmPassword = (password, confirmPassword) => {
        return password === confirmPassword;
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        let nameError = '';
        let emailError = '';
        let passError = '';
        let confirmPassError = '';
        let mobileError = '';
        let roleError = '';
    
        if (!validateName(name)) {
            nameError = 'Name must be at least 3 letters';
        }
    
        if (!validateEmail(email)) {
            emailError = 'Please enter a valid email address';
        }
    
        if (!validatePassword(pass)) {
            passError = 'Password must be at least 6 characters';
        }
    
        if (!validateConfirmPassword(pass, confirmPass)) {
            confirmPassError = 'Passwords do not match';
        }
    
        if (!validateMobile(mobile)) {
            mobileError = 'Please enter a valid 10-digit mobile number';
        }
    
        if (!role) {
            roleError = 'Please select a role';
        }
    
        if (nameError || emailError || passError || confirmPassError || mobileError || roleError) {
            setErrors({ name: nameError, email: emailError, pass: passError, confirmPass: confirmPassError, mobile: mobileError, role: roleError });
            return;
        }
    
        try {
            // First POST request to mock API (db.json)
            const mockResponse = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    pass,
                    mobile,
                    role
                }),
            });
    
            if (mockResponse.ok) {
                console.log('Data added to mock API successfully');
            } else {
                const errorData = await mockResponse.json();
                console.error('Failed to add data to mock API:', errorData.message);
            }
    
            // Second POST request to real backend
            const backendResponse = await fetch('http://localhost:8080/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: name,
                    email: email,
                    password: pass,
                    mobile: mobile,
                    role: role
                }),
            });
    
            if (backendResponse.ok) {
                navigate('/login');
            } else {
                console.error('Failed to register user with backend');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    
        setErrors({ name: '', email: '', pass: '', confirmPass: '', mobile: '', role: '' });
    };
    
    return (
        <div className="register-body1">
            <div className="register-container">
                <form className="register-form" onSubmit={handleRegisterSubmit}>
                    <h1 className="register-heading">Register</h1>
                    <div className="register-form-row">
                        <div className="register-form-group">
                            <label className="register-label" htmlFor="name"><i className="fas fa-user"></i> Name</label>
                            <input
                                className="register-input"
                                id="name"
                                placeholder="Name"
                                onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && <span className="register-error">{errors.name}</span>}
                        </div>
                        <div className="register-form-group">
                            <label className="register-label" htmlFor="email"><i className="fas fa-envelope"></i> Email</label>
                            <input
                                className="register-input"
                                id="email"
                                placeholder="Enter your Email Address"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <span className="register-error">{errors.email}</span>}
                        </div>
                    </div>
                    <div className="register-form-row">
                        <div className="register-form-group">
                            <label className="register-label" htmlFor="pass"><i className="fas fa-lock"></i> Password</label>
                            <div className="password-input-container">
                                <input
                                    className="register-input"
                                    type={isPasswordVisible ? "text" : "password"}
                                    id="pass"
                                    placeholder="Enter your Password"
                                    onChange={(e) => setPass(e.target.value)}
                                />
                                <i
                                    className={`fas ${isPasswordVisible ? "fa-eye-slash" : "fa-eye"} password-toggle-icon`}
                                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                ></i>
                            </div>
                            {errors.pass && <span className="register-error">{errors.pass}</span>}
                        </div>
                        <div className="register-form-group">
                            <label className="register-label" htmlFor="confirmPass"><i className="fas fa-lock"></i> Confirm Password</label>
                            <div className="password-input-container">
                                <input
                                    className="register-input"
                                    type={isConfirmPasswordVisible ? "text" : "password"}
                                    id="confirmPass"
                                    placeholder="Confirm your Password"
                                    onChange={(e) => setConfirmPass(e.target.value)}
                                />
                                <i
                                    className={`fas ${isConfirmPasswordVisible ? "fa-eye-slash" : "fa-eye"} password-toggle-icon`}
                                    onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                                ></i>
                            </div>
                            {errors.confirmPass && <span className="register-error">{errors.confirmPass}</span>}
                        </div>
                    </div>
                    <div className="register-form-row">
                        <div className="register-form-group">
                            <label className="register-label" htmlFor="mobile"><i className="fas fa-phone"></i> Mobile</label>
                            <input
                                className="register-input"
                                id="mobile"
                                placeholder="Enter your Mobile Number"
                                onChange={(e) => setMobile(e.target.value)}
                            />
                            {errors.mobile && <span className="register-error">{errors.mobile}</span>}
                        </div>
                        <div className="register-form-group">
                            <label className="register-label" htmlFor="role"><i className="fas fa-user-tag"></i> Role</label>
                            <select
                                className="register-select"
                                id="role"
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="">Select Role</option>
                                <option value="Organizer">Organizer</option>
                                <option value="Admin">Admin</option>
                            </select>
                            {errors.role && <span className="register-error">{errors.role}</span>}
                        </div>
                    </div>
                    <button className="register-submit-button" type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};
