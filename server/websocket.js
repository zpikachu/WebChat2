import { Server } from 'socket.io';
import messageModel from './models/message_schema.js';

const websocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST'],
            credentials: true,
        }
    });

    io.on('connection', async(socket) => {
        console.log('User connected', socket.id);

        socket.on('Join',(room_id,user_name)=>{
            socket.join(room_id);
            console.log(`${user_name} Joined ${room_id} `);
            io.to(room_id).emit('welcome',`welcome to room ${room_id}`);
        })

// Inside your socket.io server code
socket.on('send_message', (text, userId, roomId,userName) => {
  // Create a new Message document
  const newMessage = new messageModel({
    sender: userName,
    room_id: roomId,
    message: text
  });

  // Save the message to the database
  newMessage.save()
    .then(savedMessage => {
      console.log('Message saved to database:');
      // Handle success if needed
    })
    .catch(error => {
      console.error('Error saving message to database:', error);
      // Handle error if needed
    });
    io.to(roomId).emit('receive_message',newMessage.message);
});

        socket.on('disconnect', () => {
            console.log('User disconnected', socket.id);
        });
    });
};

export default websocket;