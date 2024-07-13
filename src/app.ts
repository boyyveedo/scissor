import express, { Request, Response, NextFunction } from 'express'
import { Port } from './config/config'
import bodyParser from 'body-parser'
import routes from './routes'
import { connectDB } from './database/mongoDb'
import authMiddleware from './auth/auth0'
import rateLimit from 'express-rate-limit';

const app = express()





app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(authMiddleware)
// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

app.get('/', (req, res) => {
    res.send("Scissor App")
})

//app.use('/api/v1/url', routes)
app.use('/', routes)


// Error handling middleware for rate limiting
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error && err.name === 'RateLimitError') {
        res.status(429).send('Too many requests from this IP, please try again later.');
    } else {
        next(err);
    }
});

app.listen(Port, () => {
    console.log(`Application started at http://localhost:${Port}`)
    connectDB()

})