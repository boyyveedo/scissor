import { Router } from 'express';
import { createShortUrl, handleRedirect } from "../controllers/shortUrlController"
import { getQRCode } from "../controllers/qrCodeController"
import { getAnalytics } from '../controllers/shortUrlController';
import { getLinkHistory } from '../controllers/shortUrlController';
import validateLink from '../middleware/validateLink';
import shortUrl from '../shema/shortUrl';


const routes = Router();




routes.post('/shorten', validateLink(shortUrl), createShortUrl);
routes.get('/analytics', getAnalytics);
routes.get('/history', getLinkHistory);
routes.get('/generate', getQRCode);
routes.get('/:shortId', handleRedirect);




export default routes;

