import React, { useEffect } from 'react';
import { Typography, Paper, Grid } from '@mui/material';
import Message from './Message';
import SendMessageForm from './SendMessageForm';

const Mainbar = ({ msges, user, messagesEndRef,send}) => {
  useEffect(() => {
    // Scroll to the bottom of the container when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [msges, messagesEndRef]);

  return (
    <Grid item xs={10} style={{ position: 'absolute', top: '90px',bottom:'0', right: '0', width: '70%', height: '80vh', display: 'flex', flexDirection: 'column' }}>
      <Paper style={{ flexGrow: 1,
         overflowY: 'auto',
       backgroundColor: 'rgba(255, 255, 255, 0.2)',
       backdropFilter: 'blur(10px)',
       border: '2px solid rgba(255, 255, 255, 0.1)',
       boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
      //  position: 'relative',
       paddingBottom: '90px'
       }}>
        {msges && msges.length > 0 ? (
          msges.map((msg, i) => (
            <Message
              key={i}
              sender={msg.sender}
              message={msg.message}
              timeStamp={msg.timeStamp}
              isCurrentUser={msg.sender === user.username}
            />
          ))
        ) : (
          <Typography variant="body1" style={{ textAlign: 'center', marginTop: '20px'}}>No messages yet</Typography>
        )}
        <div ref={messagesEndRef} />
      </Paper>
      <SendMessageForm  send={send}/>
    </Grid>
  );
};
export default Mainbar;
