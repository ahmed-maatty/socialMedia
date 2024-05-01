import {v2 as cloudinary} from 'cloudinary';
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_API_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

export const uploadPhoto = async (photo) => {
    try {
        const data = await cloudinary.uploader.upload( photo , {
            resource_type : "auto"
        });
        return data ;
    } catch (error) {
        return error ;
    }
};

export const removePhoto = async (publicId) => {
    try {
        const result = cloudinary.uploader.destroy(publicId);
        return result ;
    } catch (error) {
        return error ;
    }
}