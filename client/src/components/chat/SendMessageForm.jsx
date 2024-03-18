import React, { useState } from "react";
import { TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const SendMessageForm = ({ send }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() !== "") {
      send(text);
      setText("");
    }
  };


  return (
    <div> 
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)',
          padding: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message"
            onChange={(e) => setText(e.target.value)}
            value={text}
            InputProps={{
              style: {
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                color: "black",
                padding: "10px",
                color:'white'
              },
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />
          <IconButton onClick={handleSend} color="primary">
            <SendIcon />
          </IconButton>
        </div>
  
    </div>
  );
};

export default SendMessageForm;