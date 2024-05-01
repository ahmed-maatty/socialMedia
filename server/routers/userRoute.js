import express from "express";
import { verifyToken } from "../middleWares/verifyToken.js";
import { addRemoveFriend, getUser, getUserFriends } from "../controllers/userCtrl.js";
const router = express.Router();

router.get("/:id" , verifyToken , getUser);
router.get("/:id/friends" ,verifyToken , getUserFriends);

router.patch("/:id/:friedId" , verifyToken , addRemoveFriend)

export default router ;