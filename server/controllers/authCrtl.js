import User from "../models/User.js";
import bcrypt from "bcryptjs";
import path from "path" ;
import fs from "fs" ;
import { fileURLToPath } from "url" ;
import {uploadPhoto} from "../utils/cloudinary.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(__filename);

export const registerCtrl = async ( req , res ) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            friends,
            location,
            occupation
        } = req.body ;

        let user = await User.findOne({email});
        if( user ) return res.status(400).json({message : "User Already Exist !"});

        const salt = bcrypt.genSaltSync(10);
        const hashedPass = bcrypt.hashSync(password , salt);

        if(req.file){
            var imagePath = path.join(__dirname , `../../images/${req.file.filename}`);
            var result = await uploadPhoto(imagePath);
            fs.unlinkSync(imagePath);
        }

        user = new User({
            firstName,
            lastName,
            email,
            password : hashedPass,
            profilePhoto : {
                url : result ? result.secure_url : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
                publicId : result ? result.public_id : null
            },
            friends,
            location,
            occupation,
            viewedProfile : Math.floor(Math.random() * 1000),
            impressions : Math.floor(Math.random() * 1000)
        });
        await user.save();
        res.status(200).json({message : "Please, LogIn"});
    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Server Error!"});
    }
};

export const loginCtrl = async ( req , res ) => {
    try {
        const user = await User.findOne({email : req.body.email});
        if(!user){
            return res.status(404).json({message : "Email Or Password Not Found!"});
        };
        const isPassTrue = await bcrypt.compare(req.body.password , user.password);
        if(!isPassTrue){
            return res.status(404).json({message : "Email Or Password Not Found!"});
        }
        const token = user.generateToken()
        const {password , ...rest} = user._doc ;
        res.status(200).json({
            message : `Welcome ${user.firstName} ${user.lastName}`,
            user : {...rest},
            token
        });
    } catch (error) {
        res.status(500).json({message : "Server Error!"});
    }
}