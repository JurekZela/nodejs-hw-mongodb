import { v2 as cloudinary } from 'cloudinary';
import { unlink } from 'node:fs/promises';
import { env } from './env.js';
import { CLOUDINARY } from '../constants/index.js';

cloudinary.config({
    cloud_name: env(CLOUDINARY.CLOUD_NAME),
    api_key: env(CLOUDINARY.API_KEY),
    api_secret: env(CLOUDINARY.API_SECRET),
});

export const saveFileCloudinary = async(file, folder) => {
    try {
        const response = await cloudinary.uploader.upload(file.path, {
        folder,
    });

    return response.secure_url;

    } catch (error) {
        return error;
    }
    finally{
        await unlink(file.path);
    }
};
