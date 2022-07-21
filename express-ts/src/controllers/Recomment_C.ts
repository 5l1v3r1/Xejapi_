import { Request, Response, NextFunction, Application } from 'express';
import * as types from '../selftypes/types';
import * as utils from '../utils/utils';

class Recomment_sub_proccess 
{
    Recomment_delete = (req: Request, res: Response, next: NextFunction) => 
    {
        const recommentid: number = req.body.recommentid;
        
       const recomment_presence =  utils.db.query('select * from reply_comments where id = ?', [recommentid], (error: Error, result: Object[]) => 
        {
            if (error) {res.status(400).json({ok: false, error})}
            
            if (result[0])
            {
                const delete_recomment = utils.db.query('delete from reply_comments where id = ?', [recommentid], (error: Error, result: Object[]) => 
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


    
    


}

export =  new Recomment_sub_proccess()

 