import React, { useState } from 'react';
import { Typography, Button } from '@mui/material';
import { format } from 'date-fns';

const Message = ({ sender, message, timeStamp, isCurrentUser }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const truncatedMessage = message.substring(0, 100); // Truncate message to first 100 characters

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: isCurrentUser ? 'row-reverse' : 'row', // Reverse direction for current user's messages
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      margin:'0px 30px 10px 30px'
    }}>
      <div style={{
        backgroundColor: isCurrentUser ? "#dcf8c6" : "#ffffff",
        borderRadius: isCurrentUser ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
        padding: '10px',
        maxWidth: '80%',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
        wordWrap: 'break-word',
      }}>
        <Typography variant="caption" sx={{ color: "blue" }}>{isCurrentUser ? "You" : sender}</Typography>
        <Typography variant="caption" sx={{ color: "green", marginLeft: '1rem' }}>{format(new Date(timeStamp), 'hh:mm')}</Typography>
        <Typography>{isExpanded ? message : truncatedMessage}</Typography>
        {message.length > 500 && (
          <Button variant="text" size="small" onClick={toggleExpand}>
            {isExpanded ? "Read less" : "Read more"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Message;
