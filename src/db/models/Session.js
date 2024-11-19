import { Schema, model } from "mongoose";
import  { handleSaveError } from './hooks.js';

const sessionSchema = new Schema({
userId: { type: Schema.Types.ObjectId, required: true, ref: "user" },
accessToken: { type: String, required: true },
refreshToken: {type: String, required: true },
accessTokenValidUntil: { type: Date, required: true },
refreshTokenValidUntil: { type: Date, required: true },
}, { versionKey: false, timestamps: true } );

sessionSchema.post('save', handleSaveError);

sessionSchema.post('findOneAndUpdate', handleSaveError);

export const SessionCollection = model("session", sessionSchema);
