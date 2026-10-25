import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true, 
            unique: true
        },    
        password: {
            type: String,
            required: true     
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }, 
    isVerified:{
        type:Boolean,
        default:false
    },
    otp:{
        type:String
    }
});

const User = mongoose.model("User", userSchema);
export default User;
