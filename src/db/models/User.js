import { model, Schema } from 'mongoose';
import  { handleSaveError } from './hooks.js';
import { emailRegexp } from '../../constants/users.js';

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: emailRegexp },
    verify: { type: Boolean, default: false, required: true, },
    password: { type: String, required: true },
}, { timestamps: true, versionKey: false });

userSchema.post('save', handleSaveError);

userSchema.post('findOneAndUpdate', handleSaveError);

export const UserCollection = model('users', userSchema);
