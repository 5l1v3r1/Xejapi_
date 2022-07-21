import e, { Request, Response, NextFunction, Application, request, response } from 'express';
import * as utils from '../utils/utils';
import * as types from '../selftypes/types';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import fs, { access, constants } from 'fs';
import multer from 'multer';
import {upload} from '../config'
import { file } from 'googleapis/build/src/apis/file';

 
class All_Proccess {
    register = (req: Request, res: Response, next: NextFunction) => 
    {
        const register: types.Register = req.body;

        if (utils.is_valid_email(register.email) == true) 
        {
            const check_presence: any =  utils.db.query(`SELECT id FROM users WHERE username = ? or email = ? `, [register.username, register.email], (error: Error, result: Object[]) => 
            {
                if (error) { res.status(400).json({ ok: false, error, }); }

                if (result[0]) 
                {
                    res.status(400).json({ ok: false, message: 'user-already' });
                    return next();
                }

                else 
                {
                    const insert_user: any = utils.db.query("insert into users (username, email, password, re_password) VALUES (?, ?, ?, ?)", [register.username, register.email, register.password, register.re_password], (error: Error, result: Object[]) => 
                    {
                        if (error) { res.status(400).json({ ok: false, error, }); }

                        else 
                        {

                            res.status(200).json({ ok: true, result });
                            return next();
                        }
                    
                    });


                }
            })

        }
        else { return res.status(400).json({ ok: false, message: 'wrong-email' }); }

    };

    login = (req: Request, res: Response, next: NextFunction) => 
    {
        const login: types.Login = req.body;  
 
        const check_presence: any = utils.db.query(`SELECT id FROM users WHERE username =  ? and password = ?`, [login.username, login.password], (error: Error, result: Object[]) => 
        {
            if (error) { res.status(400).json({ ok: false, error }); }

            if (result[0]) 
            {
                let payload: any = { user_id: result[0] };
                let token = jwt.sign(payload, req.app.get('SECRET_KEY'), { expiresIn: 31556952000 })
                res.status(200).json({ ok: true, result, token: token });
                return next();
            }

            else 
            {

                return res.json({ ok: false, message: 'user-notFound' });
            }
       
        });


    };

    post_create = (req: Request, res: Response, next: NextFunction) => 
    {
        const post: types.Post = req.body;
        const insert_post: any = utils.db.query("insert into posts (userid, title, content) VALUES (?, ?, ?)", [post.userid, post.title, post.content], (error: Error, result: Object[]) => 
        {
            if (error) { res.status(400).json({ ok: false, error })}
            res.status(200).json({ ok: true, result });
            return next();
       
        });
    };



    like_post = (req: Request, res: Response, next: NextFunction) => 
    {
       const like: types.Like = req.body;
       
       const check_presence: any =  utils.db.query(`SELECT id FROM likes WHERE likes.userid = ? and likes.postid = ?`, [like.userid, like.postid], (error: Error, result: Object[]) => 
        {
            if (error) { res.status(400).json({ ok: false, error }) }

            if (result[0]) 
            {
                const update_state: any = utils.db.query(`update likes set _status = if(_status = 1, 0, 1) where likes.userid = ? and ?`, [like.userid, like.postid], (error: Error, result: Object[]) => 
                {
                    if (error) { res.status(400).json({ ok: false, error }); }
                    res.status(200).json({ok: true, message: 'like-update'});
                    return next();
                })
            }

            else
            {
                const save_like: any = utils.db.query('insert into likes(userID, postID) VALUES(?, ?)', [like.userid, like.postid], (error: Error, result: Object[]) => 
                {
                    if (error)  { res.status(400).json({ok: false, error}); }
                    else 
                    {
                        res.status(200).json({ok: true, message: 'like-saved' } );
                        return next();
                    }
                })
             }
        })
    }

    comment_create = (req: Request, res: Response, next: NextFunction) => 
    {
        const comment: types.Comment = req.body;
        const today: any = new Date();
        comment.date = today;
        const insert_comment: any = utils.db.query("insert into comments (userid, postid, content, date) VALUES (?, ?, ?, ?)", [comment.userid, comment.postid, comment.content, comment.date], (error: Error, result: Object[]) => 
        {
            if (error) { res.status(400).json({ ok: false, error }) }
            else 
            {
                res.status(200).json({ ok: true, result });
                return next();

            }
       
        });
    }

    create_recomment = (req: Request, res: Response, next: NextFunction) => 
    {
        const reply_comment: types.Reply_comment = req.body;
        const insert_Rcomment: any = utils.db.query("insert into reply_comments (userid, replied_commentid, content) VALUES(?, ?, ?)", [reply_comment.userid, reply_comment.replied_commentid, reply_comment.content], (error: Error, result: Object[]) =>
         {
            if (error) { res.status(400).json({ ok: false, error }) }

            else 
            {
                res.status(200).json({ ok: true, result });
                return next();
            }
        })
    }

    follow_proccess = (req: Request, res: Response, next: NextFunction) => 
    {
        const follow_user: types.Follow_user = req.body;
        
        const check_presence = utils.db.query("SELECT id FROM follow_ups WHERE follow_ups.followingID = ? and follow_ups.followedUserID = ?", [follow_user.followingID, follow_user.followedUserID], (error: Error, result: Object[]) => 
        {
            if (error) { res.status(400).json({ ok: false, error }) }

            if (result[0]) 
            {
                const update_state: any = utils.db.query(`update follow_ups set _status = if(_status = 1, 0, 1) where follow_ups.followingID = ? and ?`, [follow_user.followingID, follow_user.followedUserID], (error: Error, result: Object[]) => 
                {
                    if (error) { res.status(400).json({ ok: false, error }); }
                   
                    else
                    {
                        res.status(200).json({ ok: true, result });
                        return next();
                    }
                
                })

            }
            
            else 
            {
                const insert_follow: any = utils.db.query('insert into follow_ups(followingID, followedUserID, _status) VALUES(?, ?, 1)', [follow_user.followingID, follow_user.followedUserID], (error: Error, result: Object[]) => 
                {
                    if (error) { res.status(400).json({ ok: false, error }) }
                   
                    else 
                    {
                        res.status(200).json({ ok: true, result })
                        return next()
                    }

                })

            }
        })
    }

    block_proccess = (req: Request, res: Response, next: NextFunction) => 
    {
        const block_ups: types.Block_user = req.body;
        
        const check_presence = utils.db.query("SELECT id FROM block_ups WHERE block_ups.blockingID = ? and block_ups.blockedUserID = ?", [block_ups.blockingID, block_ups.blockedUserID], (error: Error, result: Object[]) => 
        {
            if (error) { res.status(400).json({ ok: false, error }) }

            if (result[0]) 
            {
                const update_state: any = utils.db.query(`update block_ups set _status = if(_status = 1, 0, 1) where block_ups.blockingID = ? and ?`, [block_ups.blockingID, block_ups.blockedUserID], (error: Error, result: Object[]) => 
                {
                    if (error) { res.status(400).json({ ok: false, error }); }
                   
                    else
                    {
                        res.status(200).json({ ok: true, result });
                        return next();
                    }
                
                })

            }
            
            else 
            {
                const insert_follow: any = utils.db.query('insert into block_ups(blockingID, blockedUserID) VALUES(?, ?)', [block_ups.blockingID, block_ups.blockedUserID], (error: Error, result: Object[]) => 
                {
                    if (error) { res.status(400).json({ ok: false, error }) }
                   
                    else 
                    {
                        res.status(200).json({ ok: true, result })
                        return next()
                    }

                })

            }
        })
    }

    profile_photo = async (req: Request, res: Response, next: NextFunction) => 
    {   // philosophy of this func: first delete and save
        const uploads = upload.single('image');
        
        uploads(req, res, (error: unknown) => 
        {
        if (error instanceof multer.MulterError) 
                {
                    return res.status(400).send({ok: false,  message: error.message });
                } 
                
                else if (error instanceof Error) 
                {
                    return res.status(400).send({ok: false,  message: error.message });
                }

                else 
                {   
                    const userid: any = req.body.userid;
                    const arr = ['.jpeg', '.jpg', '.png'];

                    for (let i= 0; i < arr.length; i++)
                    {
                        if (fs.existsSync(req.app.get('UPLOADS')+userid+arr[i]) == true)
                        { 
                        console.log('detected old photo now deleting')

                        const delete_file: unknown = fs.unlink(req.app.get('UPLOADS')+userid+arr[i], (error: unknown) => 
                            {  
                                if (error)  {console.log(error)}
                                console.log('deleted old photos', userid+arr[i])
                                
                            }) // end deleteing 
                        } 
                    }

                    const update_photo: any = utils.db.query('update users set users.photo = ? where users.id = ?', [userid, userid], (error:Error, result: Object[]) => 
                    {          
                        if (error) { res.status(400).json({ ok: false, error }) }
                        
                        else
                        {  
                           const get_extension = req.file?.mimetype.split('/')[1]
                           const rename_file: unknown = fs.rename(req.app.get('UPLOADS')+req.file?.filename, req.app.get('UPLOADS')+userid+'.'+get_extension, (error) => 
                            {
                                if (error)  {console.log(error)}
                                else
                                {
                                    res.status(200).send({ message: 'Image uploaded successfully' });
                                    return next();
                                }
                                
                            })
                        }
                    })
 
                }
        });
    };


    notification =  (req: Request, res: Response, next: NextFunction) => 
    {
        const notification_ups: types.Notification = req.body;
     
        
        const get_source_user: any = utils.db.query('select users.username from users where id = ? ', [notification_ups.sourceID], (error: Error, result: Object[]) => 
        {
            if (error) {res.status(400).json({ok: false, error})}
            else
            {
                const source_name: any = result[0];
                const contents: any = 
                {
                    like_post:  'liked your post',
                    follow:  'started follow you',
                    recomment:  'replied your comment',
                }
                const save_notification = utils.db.query('insert into notification(sourceID, affectedID, content, redirectID, has_it_been_read) VALUES(?, ?, ?, ?, ? )', [notification_ups.sourceID, notification_ups.affectedID,  source_name+''+contents[notification_ups.type], notification_ups.redirectID, notification_ups.has_it_been_read], (error: Error, result: Object[]) => 
                {
                    if (error) {res.status(400).json({ok: false, error})}
                    else 
                    {
                        res.status(200).json({ok: true, result})
                    }
                })
            }
        }) 
        
        
    }

};

 export = new All_Proccess()

 
 