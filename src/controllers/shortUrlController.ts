import { Response, Request } from "express";
import { createShortUrlService, getShortUrlByShortId } from "../services/shortUrlService";

function isErrorWithMessage(error: unknown): error is { message: string } {
    return typeof error === 'object' && error !== null && 'message' in error;
}

export async function createShortUrl(req: Request, res: Response): Promise<Response> {
    try {
        const { destination, customAlias } = req.body;
        const newUrl = await createShortUrlService(destination, customAlias);
        return res.status(201).json({ newUrl });
    } catch (error) {
        console.error("Error creating short URL:", error);
        if (isErrorWithMessage(error) && error.message === 'Custom URL already in use') {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function handleRedirect(req: Request, res: Response) {
    try {
        const { shortId } = req.params;
        const short = await getShortUrlByShortId(shortId);
        return res.redirect(short.destination);
    } catch (error) {
        console.error("Error handling redirect:", error);
        if (isErrorWithMessage(error) && error.message === 'URL not found') {
            return res.sendStatus(404);
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
