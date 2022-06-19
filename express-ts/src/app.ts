import express, { Request, Response, NextFunction, Application } from 'express'
import { Server } from 'http'


const app: Application = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Welcome')

})

const server: Server = app.listen(8000, () => console.log('is on port 8000'))