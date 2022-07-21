import { Request, Response, NextFunction, Application } from 'express';
import * as types from '../selftypes/types';
import * as utils from '../utils/utils';

class Post_sub_proccess 
{
    get_spesific_post = (req: Request, res: Response, next: NextFunction) => 
    {
        const post_id: number = req.body.postid;
        const get_post_content: any = utils.db.query('select * from posts where id = ?', [post_id], (error: Error, result: Object[]) => 
        {
            if (error) {res.status(400).json({ok: false, error})};
           
            if (result[0])
            {
                res.status(200).json({ok: true, result});
                return next();
            }

            else 
            {
                res.status(404).json({ok: false, msg: 'infos not found'})
            }
        })  
    }


    post_delete = (req: Request, res: Response, next: NextFunction) => 
    {
        const postid: number = req.body.postid;
        
       const check_presence: any =  utils.db.query('select * from posts where id = ?', [postid], (error: Error, result: Object[]) => 
        {
            if (error) {res.status(400).json({ok: false, error})}
            
            if (result[0])
            {
                const delete_post = utils.db.query('delete from posts where id = ?', [postid], (error: Error, result: Object[]) => 
                {
                    res.status(200).json({ok: true, result, msg: 'post deleted'})
                    return next();

                })  
            }

            else 
            {
                res.status(404).json({ok: false, msg: 'post not found'})
            }

        })   
      
        
    }

   

    post_update = (req: Request, res: Response, next: NextFunction) => 
    {
        const post: any = req.body;

        const check_presence: any = utils.db.query('select * from posts where id = ?', [post.postid], (error: Error, result: Object[]) => 
        {
            if (error) {res.status(400).json({ok: false, error})}
            
            if (result[0])
            {
                const post_update: any = utils.db.query('update posts set posts.title = ?, posts.content = ? where id = ?', [post.title, post.content, post.postid], (error: Error, result: Object[]) => 
        {
                if (error) {res.status(400).json({ok: false, error})}
                else 
                {
                    res.status(200).json({ok: true, msg: 'has been update'})

                }
        }) 
            }

            else 
            {
                res.status(404).json({ok: false, msg: 'post not found'})
            }

        })   

    }
}



export =  new Post_sub_proccess()



