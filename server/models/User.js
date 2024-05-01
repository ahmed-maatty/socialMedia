import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        profilePhoto: {
            type: Object,
            default: {
                url : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
                publicId : null
            },
        },
        friends: {
            type: Array,
            default: [],
        },
        location: {
            type : String
        },
        occupation: {
            type : String
        },
        viewedProfile: {
            type : Number
        },
        impressions: {
            type : Number
        },
    },
    { timestamps: true }
);

userSchema.methods.generateToken = function(){
    return jwt.sign({ id : this._id } , process.env.JWT_SECRET , {
        expiresIn : "3d"
    });
};

const User = mongoose.model("User" , userSchema);

export default User ;