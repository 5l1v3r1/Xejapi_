"use strict";
import express, { Request, Response, NextFunction, Application, Router } from 'express';

export const UserRoute: Router = express.Router();
//export const PostRoute: Router = express.Router(); // for post proccess
UserRoute.use(express.json());
UserRoute.use(express.urlencoded({ extended: true })); // we tell "url convert to our language"
import User_Proccess from '../controllers/User_C';


UserRoute.get('/register', User_Proccess.register, (req: Request, res: Response) => { })
UserRoute.get('/login', User_Proccess.login, (req: Request, res: Response) => { })
//UserRoute.post('/update-biography', User_Proccess.biography, (req: Request, res: Response) => { })
//PostRoute.post('/post-create', User_Proccess.post_create, (req: Request, res: Response) => { })
//PostRoute.delete('/post-delete/:id', User_Proccess.post_delete, (req: Request, res: Response) => { })





