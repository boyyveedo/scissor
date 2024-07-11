import mongoose, { Document } from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcde098765", 6)




export interface shortURL extends Document {
    shortId: string
    destination: string
    customAlias?: string;
}

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        unique: true,
        required: true,
        default: () => nanoid(6),
    },
    destination: { type: String, required: true },
    customAlias: {
        type: String,
        unique: true,
        sparse: true, // Allows null values (useful for unique constraints)
    },
});


export const shortUrl = mongoose.model<shortURL>('shortUrl', urlSchema);