import {v2 as cloudinary} from 'cloudinary';
import {CloudinaryStorage} from 'multer-storage-cloudinary';
import {config} from 'dotenv'
config();

// @ts-ignore
cloudinary.config({
cloud_name:process.env.CLOUDINARY_cloud_name,
api_key: process.env.CLOUDINARY_api_key,
api_secret:process.env.CLOUDINARY_api_secret
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: async(req,file)=>(
        {
        folder:"Fullstack-saas"
    }
)
})
export {cloudinary, storage}