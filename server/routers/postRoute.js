import express from "express";
import { verifyToken } from "../middleWares/verifyToken.js";
import photoUpload from "../middleWares/uploadPhoto.js";
import { addRemovelike, createPostCtrl, getAllPosts, getUserPosts } from "../controllers/postCtrl.js";
const router = express.Router();

/* Create Post */
router.post("/create-post" , verifyToken , photoUpload.single("image") , createPostCtrl);

/* Get Posts*/
router.get("/" , getAllPosts);
router.get("/:id/posts" , getUserPosts);

router.patch("/:id/like" , verifyToken , addRemovelike)

export default router ;