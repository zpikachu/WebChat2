import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: { type: String },
    room_id: { type: String },
    message: { type: String },
    timeStamp: { type: Date, default: Date.now }
});

// Create a TTL index on the timeStamp field
messageSchema.index({ timeStamp: 1 }, { expireAfterSeconds: 86400 }); // 86400 seconds = 1 day

const Message = mongoose.model("Message", messageSchema);

export default Message;
