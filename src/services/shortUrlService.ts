import { shortUrl } from "../models/shortUrl.model";
import { nanoid } from "nanoid";

export async function createShortUrlService(destination: string, customAlias?: string) {
    // Check if a custom alias is provided and if it's valid
    if (customAlias) {
        // Check if the custom url already exists in the database
        const existingUrl = await shortUrl.findOne({ shortId: customAlias });

        if (existingUrl) {
            throw new Error('Custom URL already in use');
        }
    }

    // Determine the short ID to use
    const shortId = customAlias || nanoid(6);

    // Create a new URL document
    const newUrlData = { shortId, destination };
    const newUrl = new shortUrl(newUrlData);
    await newUrl.save();

    return newUrl;
}

export async function getShortUrlByShortId(shortId: string) {
    const short = await shortUrl.findOne({ shortId });
    if (!short) {
        throw new Error('URL not found');
    }
    short.clicks++;
    await short.save();
    return short;
}

