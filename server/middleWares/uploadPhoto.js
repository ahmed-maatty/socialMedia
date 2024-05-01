import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination : function( req , file , cb ){
        cb(null , path.join(__dirname,"../images"));
    },
    filename : function( req , file , cb ){
        if(file){
            cb(null , new Date().toISOString().replace( /:/g , "-") + file.originalname);
        }else{
            cb(null , false);
        }
    }
});

const photoUpload = multer({
    storage,
    fileFilter : function( req , file , cb ){
        if( file.mimetype.startsWith("image") ){
            cb(null , true);
        }else{
            cb("Unsupported File Format !" , false);
        }
    },
    limits : {fileSize : 1024 * 1024}
});

export default photoUpload ;