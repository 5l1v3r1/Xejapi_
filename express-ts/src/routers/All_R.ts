"use strict";
import express, { Request, Response, NextFunction, Application, Router } from 'express';
import multer, { FileFilterCallback } from 'multer'

export const Getdb: Router = express.Router();
export const Preproccess: Router = express.Router();
export const PostRoute: Router = express.Router();
export const CommentRoute: Router = express.Router();
export const RecommentRoute: Router = express.Router();
export const NotificationRoute: Router = express.Router();


Preproccess.use(express.json());
Preproccess.use(express.urlencoded({ extended: true }));

import All_Proccess from '../controllers/AllProccess';
import Notification_sub_Proccess from '../controllers/Notification_C';
import Post_sub_proccess from '../controllers/Post_C';
import Comment_sub_proccess from '../controllers/Comment_C';
import Recomment_sub_proccess from '../controllers/Recomment_C';
import * as  midwares from '../middleware/user.middleware';
import GetDb_c from '../controllers/GetDb_c';

// full-proccess

Preproccess.post('/register-user', All_Proccess.register, (req: Request, res: Response) => { });
Preproccess.post('/login-user', All_Proccess.login, (req: Request, res: Response) => { });
Preproccess.post('/update-photo', All_Proccess.profile_photo, (req: Request, res: Response) => { });
Preproccess.post('/follow-user', All_Proccess.follow_proccess, (req: Request, res: Response) => { });
Preproccess.post('/block-user', All_Proccess.block_proccess, (req: Request, res: Response) => { });
Preproccess.post('/notification-create', All_Proccess.notification, (req: Request, res: Response) => { });
Preproccess.post('/post-create', All_Proccess.post_create, midwares.requireAuth, (req: Request, res: Response) => { });
Preproccess.post('/comment-create', All_Proccess.comment_create, (req: Request, res: Response) => { });
Preproccess.post('/recomment-create', All_Proccess.create_recomment, (req: Request, res: Response) => { });

// notification
NotificationRoute.post('/notification-delete', Notification_sub_Proccess.notification_delete, (req: Request, res: Response) => { });
NotificationRoute.post('/notification-update', Notification_sub_Proccess.notification_update, (req: Request, res: Response) => { });

// post
PostRoute.post('/post-delete', Post_sub_proccess.post_delete, midwares.requireAuth, (req: Request, res: Response) => { });
PostRoute.post('/post-update', Post_sub_proccess.post_update, midwares.requireAuth, (req: Request, res: Response) => { });

// comment
CommentRoute.post('/comment-delete', Comment_sub_proccess.comment_delete, (req: Request, res: Response) => { });
CommentRoute.post('/comment-update', Comment_sub_proccess.comment_update, (req: Request, res: Response) => { });

// re-comment
RecommentRoute.post('/recomment-delete', Recomment_sub_proccess.Recomment_delete, (req: Request, res: Response) => { });

// Getdb
Getdb.get('/get-db', GetDb_c.get_all_db, (req: Request, res: Response) => { });
Getdb.get('/get-users', GetDb_c.get_users, (req: Request, res: Response) => { });
Getdb.get('/get-posts', GetDb_c.get_posts, (req: Request, res: Response) => { });
Getdb.get('/get-comments', GetDb_c.get_comments, (req: Request, res: Response) => { });
Getdb.get('/get-recomments', GetDb_c.get_recomments, (req: Request, res: Response) => { });
Getdb.get('/get-likes', GetDb_c.get_likes, (req: Request, res: Response) => { });
Getdb.get('/get-follows', GetDb_c.get_follows, (req: Request, res: Response) => { });
Getdb.get('/get-blocked', GetDb_c.get_blocked, (req: Request, res: Response) => { });
Getdb.get('/get-notification', GetDb_c.get_notification, (req: Request, res: Response) => { });
 