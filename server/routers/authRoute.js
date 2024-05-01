import expres from "express";
import {loginCtrl, registerCtrl} from "../controllers/authCrtl.js";
import photoUpload from "../middleWares/uploadPhoto.js"
const router = expres.Router();

router.post("/register" , photoUpload.single("image") , registerCtrl);

router.post("/login" , loginCtrl);

export default router;