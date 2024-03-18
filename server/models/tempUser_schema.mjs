import mongoose from 'mongoose';

const tempUserSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString() // Generate a unique ID for each user
    },
    email: {
        type: String,
        unique: true // Ensure uniqueness of email addresses
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
    otp:{
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Add TTL index to expire documents after 2 minutes
tempUserSchema.index({ createdAt: 1 }, { expireAfterSeconds: 120 });

const TempUser = mongoose.model("tempUser", tempUserSchema);

export default TempUser;
