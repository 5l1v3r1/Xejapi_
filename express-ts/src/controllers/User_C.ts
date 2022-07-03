import { Request, Response, NextFunction, Application } from 'express';
import { resolve } from 'path';
import * as utils from '../utils/utils';
import * as types from '../selftypes/types';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { appendFile } from 'fs';
import multer from 'multer';

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

class User_Proccess {
    register = (req: Request, res: Response, next: NextFunction) => {
        const register: types.Register = req.body;
        const query_string_check: any = `SELECT id FROM users WHERE username = ? or email = ? `

        if (utils.is_valid_email(register.email) == true) {
            utils.db.query(query_string_check, [register.username, register.email], (error: Error, result: Object[]) => {
                if (error) { res.status(400).json({ ok: false, error, }); }

                if (result[0]) {
                    console.log('[register]: ', result);
                    res.status(400).json({ ok: false, msg: 'user-already' });
                    return next();
                }

                else {
                    const query_string: string = "insert into users (username, email, password, re_password) VALUES (?, ?, ?, ?)";
                    utils.db.query(query_string, [register.username, register.email, register.password, register.re_password], (error: Error, result: Object[]) => {
                        if (error) { res.status(400).json({ ok: false, error, }); }

                        else {

                            res.status(200).json({ ok: true, result });
                            return next();
                        }
                    });


                }
            })

        }
        else { return res.status(400).json({ ok: false, msg: 'wrong-email' }); }

    };

    login = (req: Request, res: Response, next: NextFunction) => {
        const login: types.Login = req.body; // username, password 
        const query_string: string = `SELECT id FROM users WHERE username =  ? and password = ?`;

        utils.db.query(query_string, [login.username, login.password], (error: Error, result: Object[]) => {
            if (error) { res.status(400).json({ ok: false, error }); }

            if (result[0]) {
                let payload: any = { user_id: result[0] };
                let token = jwt.sign(payload, req.app.get('SECRET_KEY'), { expiresIn: 31556952000 })
                res.status(200).json({ ok: true, result, token: token });
                return next();
            }

            else {

                return res.json({ ok: false, msg: 'user-notFound' });
            }
        });


    };

    post_create = (req: Request, res: Response, next: NextFunction) => {
        const post: types.Post = req.body;
        const query_string: string = "insert into posts (userid, title, content) VALUES (?, ?, ?)";
        utils.db.query(query_string, [post.userid, post.title, post.content], (error: Error, result: Object[]) => {
            if (error) {
                res.status(400).json({
                    ok: false,
                    error
                })
            }

            res.status(200).json({ ok: true, result });
            return next();
        });
    };

    like_post = (req: Request, res: Response, next: NextFunction) => {
        const like: types.Like = req.body;
        const check_exist_like: any = `SELECT id FROM likes WHERE likes.userid = ${like.userid} and likes.postid = ${like.postid}`;
        utils.db.query(check_exist_like, [like.userid, like.postid], (error: Error, result: Object[]) => {
            if (error) { res.status(400).json({ ok: false, error }) }

            if (result[0]) {
                console.log('[there is id]: ', result[0])

                const query_string_SELECT: any = `update likes set _like = if(_like = 1, 0, 1) where likes.userid = ${like.userid} and ${like.postid}`

                utils.db.query(query_string_SELECT, (error: Error, result: Object[]) => {
                    if (error) { res.status(400).json({ ok: false, error }); }
                    res.status(200).json(result);
                    return next();
                })
            }

            else {
                const check_exist_post_user = `select id  from posts where id = ? and userid = ?`;
                utils.db.query(check_exist_like, [like.postid, like.userid], (error: Error, result: Object[]) => {
                    if (error) { res.status(400).json({ ok: false, error }) }

                    if (result[0]) {
                        const createLike_query = `insert into likes (userid, postid) VALUES(?, ?)`;

                        utils.db.query(createLike_query, [like.userid, like.postid], (error: Error, result: Object[]) => {
                            if (error) { res.status(400).json({ ok: false, error }) }

                            res.status(200).json({ ok: true, result })
                            return next()
                        })
                    }
                    else {
                        res.status(200).json({ ok: false, msg: 'user and post not found' })
                    }
                })
            }
        })
    };

    comment_create = (req: Request, res: Response, next: NextFunction) => {
        const comment: types.Comment = req.body;
        const query_string: string = "insert into comments (userid, postid, content, date) VALUES (?, ?, ?, ? )";
        const today: any = new Date();
        comment.date = today;

        utils.db.query(query_string, [comment.userid, comment.postid, comment.content, comment.date], (error: Error, result: Object[]) => {
            if (error) { res.status(400).json({ ok: false, error }) }
            else {
                res.status(200).json({ ok: true, result });
                return next();

            }
        });
    }

    reply_comment = (req: Request, res: Response, next: NextFunction) => {
        const reply_comment: types.Reply_comment = req.body;
        const query_string: any = "insert into reply_comments (userid, replied_commentid, content) VALUES(?, ?, ?)";

        utils.db.query(query_string, [reply_comment.userid, reply_comment.replied_commentid, reply_comment.content], (error: Error, result: Object[]) => {
            if (error) { res.status(400).json({ ok: false, error }) }
            else {
                res.status(200).json({ ok: true, result });
                return next();
            }
        })
    }
    /*
        follow_user = (req: Request, res: Response, next: NextFunction) => {
    
        }*/
    upload_image = (req: Request, res: Response, next: NextFunction) => {
        console.log(req.file);

        return res.json({ message: 'Imagem enviada' });
    };

};
export = new User_Proccess()