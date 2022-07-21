import { Request, Response, NextFunction, Application } from 'express';
import * as types from '../selftypes/types';
import * as utils from '../utils/utils';

class Comment_sub_proccess 
{
    comment_delete = (req: Request, res: Response, next: NextFunction) => 
    {
        const commentid: number = req.body.commentid;
        
       const comment_presence =  utils.db.query('select * from comments where id = ?', [commentid], (error: Error, result: Object[]) => 
        {
            if (error) {res.status(400).json({ok: false, error})}
            
            if (result[0])
            {
                const delete_comment = utils.db.query('delete from comments where id = ?', [commentid], (error: Error, result: Object[]) => 
                {
                    res.status(200).json({ok: true, result, msg: 'comment deleted'})
                    return next();

                })  
            }

            else 
            {
                res.status(404).json({ok: false, msg: 'comment not found'})
            }

        })   
      
        
    }


    comment_update = (req: Request, res: Response, next: NextFunction) => 
    {
        const comment: any = req.body;
        utils.db.query('select * from comments where id = ?', [comment.commentid], (error: Error, result: Object[]) => 
        {
            if (error) {res.status(400).json({ok: false, error})}
            
            if (result[0])
            {
                const comment_update: any = utils.db.query('update comments set comments.content = ? where comments.id = ?', [comment.content, comment.commentid], (error: Error, result: Object[]) => 
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
                res.status(404).json({ok: false, msg: 'comment not found'})
            }

        })   

    }
    


}

export =  new Comment_sub_proccess()


/* */