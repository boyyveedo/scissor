import express from 'express'
import { Port } from './config/config'
import bodyParser from 'body-parser'
import routes from './routes'
import { connectDB } from './database/mongoDb'
import authMiddleware from './auth/auth0'

const app = express()





app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(authMiddleware)

//app.use('/api/v1/url', routes)
app.use('/', routes)


app.listen(Port, () => {
    console.log(`Application started at http://localhost:${Port}`)
    connectDB()

})