"use strict";
import express, { Application } from 'express';
import { Server } from 'http';
import * as midwares from './middleware/user.middleware'

const app: Application = express();
import * as routers from './routers/User_R';
import * as utils from './utils/utils';
import initilaze from './model/init_M';
import { config as config } from './config'


// decode json
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const SECRET_KEY: string = 'your-secret-key-here';
app.set('SECRET_KEY', SECRET_KEY);

app.use('/api/user', routers.UserRoute);
app.use('/api/post', routers.PostRoute);
app.use('/api/comment', routers.CommentRoute);
utils.db;
initilaze.init();


const server: Server = app.listen(config.server.port, () => console.log('is on port 8000'))