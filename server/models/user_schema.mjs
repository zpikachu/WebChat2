import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    profile: {
        type: String
    },
    room_id:{
        type:String,
        default:null,
    }
});

const User = mongoose.model("User", userSchema);

export default User;
