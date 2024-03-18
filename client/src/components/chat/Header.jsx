import React from 'react';
import { Typography, Avatar, Button, Paper } from '@mui/material';

const Header = ({ user, logout }) => {
  return (
    <Paper style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      padding: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      border: '2px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
      zIndex: 9999, // Set a high z-index value
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={user?.profile} alt="User Profile" sx={{ width: 50, height: 50, marginRight: '10px' }} />
        <Typography variant="h5" sx={{ color: "black" }}>{user?.username}</Typography>
      </div>
      <Button variant="contained" onClick={() => logout(user?.user_id)}>Logout</Button>
    </Paper>
  );
};

export default Header;
