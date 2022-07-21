"use strict";
import express, { Application } from 'express';
import { Server } from 'http';

const app: Application = express();

import * as routers from './routers/All_R';
import * as utils from './utils/utils';
import initilaze from './model/init_M';
import { config, fileFilter, storage } from './config';

 
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use("/uploads", express.static("uploads"));

 
app.set('UPLOADS', './src/uploads/');


app.use('/api/getdata', routers.Getdb);
app.use('/api/preproccess', routers.Preproccess);
app.use('/api/notification', routers.NotificationRoute);
app.use('/api/post', routers.PostRoute);
app.use('/api/comment', routers.CommentRoute);
app.use('/api/recomment', routers.RecommentRoute);
utils.db;
initilaze.init();

const server: Server = app.listen(config.server.port, () => console.log('is on port 8000'))