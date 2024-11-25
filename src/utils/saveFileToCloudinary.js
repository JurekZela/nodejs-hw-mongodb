import { v2 as cloudinary } from 'cloudinary';
import { unlink } from 'node:fs/promises';
import { env } from './env.js';

const cloud_name = env('CLOUD_NAME');
const api_key = Number(env('API_KEY'));
const api_secret = env('API_SECRET')

cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
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
