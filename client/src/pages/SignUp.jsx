import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [otp, setOtp] = useState('');
    const [disable, setDisable] = useState(false);

    const handleSendOtp = () => {
        axios
      .post("http://localhost:3000/api/user/register", userInfo)
      .then(async (response) => {
        
        if (!response.data.success) {
          alert(response.data.message); 
        }else{
          alert(response.data.message); 
          setDisable(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
        
    };

    const handleVerify = () => {
        axios
        .post(`http://localhost:3000/api/user/verify`, {otp,email:userInfo.email})
        .then(async (response) => {
          if (response.data.success) {
            alert(response.data.message);
            navigate("/login");
          }else{
          alert(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
                    placeholder='OTP'
                    name='otp'
                    fullWidth
                    onChange={e => setOtp(e.target.value)}
                    sx={{ mb: 1 }}
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
