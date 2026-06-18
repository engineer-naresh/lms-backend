import type {Request} from 'express';
import multer from 'multer';
import path from 'path';

// Configure the explicit diskStorage engine instead of using 'dest'
const storage = multer.diskStorage({
    destination: (req:Request, file:Express.Multer.File, cb:Function) => {
        // This is your target folder path
        cb(null, './src/storage');
    },
    filename: (req:Request, file:Express.Multer.File, cb:Function) => {
        // Generate a unique suffix so files with identical names don't overwrite each other
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
        
        // Grab the original file extension (e.g., .png) safely using the path module
        const fileExtension = path.extname(file.originalname);
        
        // Save it with the extension attached! (e.g., courseThumbnail-1718921043-image.png)
        cb(null, uniqueSuffix + fileExtension);
    }
});
export {multer,storage}