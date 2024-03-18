import Message from '../models/message_schema.js';

export const getMessageByRoomId = async (req, res) => {
    const { room_id } = req.body;
  
    try {
      // Find messages by room_id
      const messages = await Message.find({ room_id });
      // Check if any messages were found
      if (messages.length === 0) {
      return res.json({ message: 'No messages found for the specified room_id' });
      }
      // Return the messages
      res.json({messages});
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.json({ message: 'Internal server error' });
    }
  };



