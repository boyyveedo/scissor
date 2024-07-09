import { Router } from 'express';
import { createShortUrl, handleRedirect } from "../controllers/shortUrlController"
const routes = Router();
routes.post('/shorten', createShortUrl);
routes.get('/:shortId', handleRedirect);

export default routes;

