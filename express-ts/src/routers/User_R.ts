"use strict";
import express, { Request, Response, NextFunction, Application, Router } from 'express';

export const UserRoute: Router = express.Router();
export const PostRoute: Router = express.Router(); // for Post proccess
export const CommentRoute: Router = express.Router(); // for Comment e proccess
import { multerConfig } from '../config';
import multer from 'multer';

UserRoute.use(express.json());
UserRoute.use(express.urlencoded({ extended: true })); // we tell "url convert to our language"

import User_Proccess from '../controllers/User_C';
import * as  midwares from '../middleware/user.middleware'


UserRoute.post('/register', User_Proccess.register, (req: Request, res: Response) => { });
UserRoute.post('/login', User_Proccess.login, (req: Request, res: Response) => { });

PostRoute.post('/post-create', User_Proccess.post_create, midwares.requireAuth, (req: Request, res: Response) => { });
PostRoute.post('/post-like', User_Proccess.like_post, (req: Request, res: Response) => { });
PostRoute.post('/file-upload', User_Proccess.upload_image, multer(multerConfig).single('file'), (req: Request, res: Response) => { });

CommentRoute.post('/comment-create', User_Proccess.comment_create, (req: Request, res: Response) => { })
CommentRoute.post('/comment-reply', User_Proccess.reply_comment, (req: Request, res: Response) => { })




