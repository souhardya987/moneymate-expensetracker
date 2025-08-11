import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { APIUrl, handleError, handleSuccess } from '../utils';

function Login() {
    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) return handleError('Email and password are required');

        try {
            const url = `${APIUrl}/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => navigate('/home'), 1000);
            } else if (error) {
                handleError(error?.details[0]?.message || 'Error occurred');
            } else {
                handleError(message);
            }
        } catch (err) {
            handleError(err.message);
        }
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>MoneyMate – Expense Tracker</h1>
            <div style={cardStyle}>
                <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Login</h2>
                <form onSubmit={handleLogin}>
                    <label>Email</label>
                    <input
                        style={inputStyle}
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={loginInfo.email}
                    />
                    <label>Password</label>
                    <input
                        style={inputStyle}
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={loginInfo.password}
                    />
                    <button type='submit' style={buttonStyle}>Login</button>
                    <p style={{ textAlign: 'center', marginTop: '10px' }}>
                        Don't have an account? <Link to="/signup">Signup</Link>
                    </p>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px'
};
const headerStyle = {
    marginBottom: '30px',
    fontSize: '1.8rem',
    color: '#2c3e50'
};
const cardStyle = {
    background: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px'
};
const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc'
};
const buttonStyle = {
    width: '100%',
    background: '#2e7d32',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem'
};

export default Login;
