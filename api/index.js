import express from 'express';
import cors from 'cors'
import { errorHandler } from './middlewares/index.js';
import userRouter from './routes/users.js';
import { data } from './data/index.js';
import 'dotenv/config'

const port = process.env.PORT
const url = process.env.MONGODB_URI

try {
    data.connect(url).catch(error => console.error(error))
        .then(() => {
            const api = express()

            api.use(cors())

            api.get('/api', (req, res) => { res.status(200).send('Hello World!') })

            api.use('/users', userRouter)

            api.use(errorHandler)

            api.listen(port, () => { console.info(`API listening to PORT: ${port}`) })
        })
} catch (error) {
    console.error(error)
}