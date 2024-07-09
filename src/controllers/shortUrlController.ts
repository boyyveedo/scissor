import { Response, Request } from "express"
import { shortUrl } from "../models/shortUrl.model"
import { nanoid } from "nanoid"

export async function createShortUrl(req: Request, res: Response): Promise<Response> {
    try {
        const { destination } = req.body;
        const existingUrl = await shortUrl.findOne({ destination });

        if (existingUrl) {
            return res.status(200).json({ existingUrl });
        } else {
            const shortId = nanoid(7);
            const newUrlData = { shortId, destination };
            const newUrl = new shortUrl(newUrlData);
            await newUrl.save();
            return res.status(201).json({ newUrl });
        }
    } catch (error) {
        console.error("Error creating short URL:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function handleRedirect(req: Request, res: Response) {
    try {
        const { shortId } = req.params;
        const short = await shortUrl.findOne({ shortId }).lean();

        if (!short) {
            return res.sendStatus(404);
        }

        return res.redirect(short.destination);
    } catch (error) {
        console.error("Error handling redirect:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}