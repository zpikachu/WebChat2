import { Box, Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [otp, setOtp] = useState('');
    const [disable, setDisable] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);

    useEffect(() => {
        let intervalId;
        if (disable) {
            intervalId = setInterval(() => {
                setTimeRemaining(prevTime => Math.max(0, prevTime - 1000)); // Decrease time by 1 second
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [disable]);

    const handleSendOtp = () => {
        // Validation
        if (!validateInput()) {
            return;
        }

        axios
            .post("http://localhost:3000/api/user/register", userInfo)
            .then(async (response) => {
                if (!response.data.success) {
                    alert(response.data.message); 
                } else {
                    alert(response.data.message); 
                    setDisable(true);
                    setTimeRemaining(120000); // Set time remaining to 2 minutes
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleVerify = () => {
        axios
            .post("http://localhost:3000/api/user/verify", {otp, email: userInfo.email})
            .then(async (response) => {
                if (response.data.success) {
                    alert(response.data.message);
                    navigate("/login");
                } else {
                    alert(response.data.message);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const validateInput = () => {
        const { email, username, password } = userInfo;

        // Check for email format
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return false;
        }

        // Check for username length
        if (username.length < 4 || username.length > 10) {
            alert("Username must be at least 8 characters long.");
            return false;
        }

        // Check for password length
        if (password.length < 8 || password.length > 12) {
            alert("Password must be at least 8 characters long.");
            return false;
        }

        return true;
    };

    const validateEmail = (email) => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleOtpChange = (e) => {
        const { value } = e.target;
        if (value.length <= 4) {
            setOtp(value);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box component='form' sx={{ maxWidth: 400, width: '100%', p: 2, border: '1px solid #ccc', borderRadius: 8, padding: '30px' }}>
                <TextField
                    placeholder='Email'
                    name='email'
                    fullWidth
                    onChange={e => setUserInfo({ ...userInfo, [e.target.name]: e.target.value })}
                    sx={{ mb: 1 }}
                    autoComplete="email"
                    disabled={disable}
                />
                <TextField
                    placeholder='Username'
                    name='username'
                    fullWidth
                    onChange={e => setUserInfo({ ...userInfo, [e.target.name]: e.target.value })}
                    sx={{ mb: 1 }}
                    autoComplete="username"
                    inputProps={{ maxLength: 10 }}
                    disabled={disable}
                />
                <TextField
                    placeholder='Password'
                    name='password'
                    type='password'
                    fullWidth
                    onChange={e => setUserInfo({ ...userInfo, [e.target.name]: e.target.value })}
                    sx={{ mb: 1 }}
                    autoComplete="current-password"
                    inputProps={{ maxLength: 12 }}
                    disabled={disable}
                />
                <Button
                    variant='contained'
                    fullWidth
                    onClick={handleSendOtp}
                    sx={{ mb: 1 }}
                    disabled={disable}
                >
                    Send OTP
                </Button>
                <TextField
                    placeholder={`Time remaining: ${Math.floor(timeRemaining / 60000)}:${(timeRemaining % 60000 / 1000).toFixed(0).padStart(2, '0')}`}
                    name='otp'
                    fullWidth
                    value={otp}
                    onChange={handleOtpChange}
                    sx={{ mb: 1 }}
                    inputProps={{ maxLength: 4 }}
                    autoComplete="one-time-code"
                    disabled={!disable}
                />
                <Button
                    variant='contained'
                    fullWidth
                    onClick={handleVerify}
                    disabled={!disable}
                >
                    Verify
                </Button>
            </Box>
        </div>
    );
};

export default SignUp;
