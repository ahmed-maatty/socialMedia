import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref : "User"
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        location: {
            type : String
        },
        description: {
            type : String
        },
        postPhoto: {
            type : Object,
            default : {
                url : "" ,
                publicId : null
            }
        },
        likes: {
            type: Map,
            of: Boolean,
        },
        comments: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
)

const Post = mongoose.model("Post" , postSchema);

export default Post ;