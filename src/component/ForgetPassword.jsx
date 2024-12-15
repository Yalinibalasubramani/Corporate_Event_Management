import React, { useState } from 'react';
import '../assets/forgetpassword.css'
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ email: ''});
  const [success, setSuccess] = useState('');
  const navigate=new useNavigate('');
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};
  const handlePasswordReset = (e) => {

    e.preventDefault();
    let emailError='';
    if(!validateEmail(email))
    {
        emailError='Please enter a valid email address';
    }
    if (emailError) 
    {
            setErrors({ email: emailError});
            setSuccess('');
            return;
    }
    
    console.log('Password reset email sent to:', email);
    setSuccess('Successfully sent Password rest to your mail');
    setErrors({email:''});
    setTimeout(() => {
            navigate('/resetpassword');
        }, 2000); 

  };

  return (
    <div className='body3'>
    <div className='forgotpass'>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <span className="error" style={{ color: 'red' }}>{errors.email}</span>}
      {success && <span className="success" style={{ color: 'green' }}>{success}</span>}
      <button type="button" onClick={handlePasswordReset}>Reset Password</button>
    </div>
    </div>
  );
};

export default ForgotPassword;
