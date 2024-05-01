import Post from "../models/Post.js";
import User from "../models/User.js"
import path from "path";
import fs from "fs";
import {fileURLToPath} from "url";
import { uploadPhoto } from "../utils/cloudinary.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createPostCtrl = async (req , res) => {
    try {
        const {description} = req.body ;
        const user = await User.findById(req.user.id);

        if(req.file){
            var imagePath = path.join(__dirname , `../images/${req.file.filename}`);
            var result = await uploadPhoto(imagePath);
            fs.unlinkSync(imagePath)
        }

        const post = new Post({
            userId : req.user.id,
            description,
            postPhoto : {
                url : req.file ? result.secure_url : "",
                publicId : req.file ? result.public_id : null,
            },
            firstName : user.firstName,
            lastName : user.lastName,
            location : user.location,
            likes : {},
            comments : []
        });

        await post.save();

        res.status(200).json({message : "Post Was Created"});
    } catch (error) {
        res.status(500).json("Server Error!");
    }
};

/* Get All Posts */
export const getAllPosts = async ( req , res ) => {
    try {
        const allPosts = await Post.find().populate("userId");
        res.status(200).json(allPosts);
    } catch (error) {
        res.status(500).json("Server Error!");
    }
};

/* Get User Post */
export const getUserPosts = async ( req , res ) => {
    try {
        const {id} = req.params ;
        const userPosts = await Post.find({userId : id}).populate("userId");
        res.status(200).json(userPosts);
    } catch (error) {
        res.status(500).json("Server Error!");
    }
};

/* Add like*/

export const addRemovelike = async ( req , res ) => {
    try {
        const {id} = req.params ;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(req.user.id);
        if(isLiked){
            post.likes.delete(req.user.id)
        }else{
            post.likes.set(req.user.id , true);
        };
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {
                likes : post.likes
            },
            {new : true}
        )
        res.status(200).json(updatedPost)
    } catch (error) {
        
    }
}