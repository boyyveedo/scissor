import { Router } from 'express';
import { createShortUrl, handleRedirect } from "../controllers/shortUrlController"
import { getQRCode } from "../controllers/qrCodeController"
// import validateLink from '../middleware/validateLink';
// import shortUrl from '../shema/shortUrl';

const routes = Router();
routes.get('/generate', getQRCode)
routes.post('/shorten', createShortUrl);
routes.get('/:shortId', handleRedirect);


export default routes;

