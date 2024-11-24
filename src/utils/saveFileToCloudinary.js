import { v2 as cloudinary } from 'cloudinary';
import { unlink } from 'node:fs/promises';
import { env } from './env.js';

cloudinary.config({
    cloud_name: env("CLOUD_NAME"),
    api_key: env("API_KEY"),
    api_secret: env("API_SECRET"),
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
