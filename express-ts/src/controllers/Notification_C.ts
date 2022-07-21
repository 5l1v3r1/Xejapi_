import { Request, Response, NextFunction, Application } from 'express';
import * as types from '../selftypes/types';
import * as utils from '../utils/utils';


class Notification_sub_proccess 
{

   
    notification_delete = (req: Request, res: Response, next: NextFunction) => 
    {
        const notificationid: number = req.body.notificationid;
        
       const notification_presence =  utils.db.query('select * from notification where id = ?', [notificationid], (error: Error, result: Object[]) => 
        {
            if (error) {res.status(400).json({ok: false, error})}
            
            if (result[0])
            {
                const delete_notification = utils.db.query('delete from notification where id = ?', [notificationid], (error: Error, result: Object[]) => 
                {
                    res.status(200).json({ok: true, result, msg: 'notification deleted'})
                    return next();

                })  
            }

            else 
            {
                res.status(404).json({ok: false, msg: 'notification not found'})
            }

        })   
      
        
    }


    notification_update = (req: Request, res: Response, next: NextFunction) => 
    {
        const notificationid: any = req.body.notificationid;
        utils.db.query('select * from notification where id = ?', [notificationid], (error: Error, result: Object[]) => 
        {
            if (error) {res.status(400).json({ok: false, error})}
            
            if (result[0])
            {
            const post_update: any = utils.db.query('update notification set notification.has_it_been_read = ? where notification.id = ?', [1, notificationid], (error: Error, result: Object[]) => 
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
                res.status(404).json({ok: false, msg: 'notification not found'})
            }

        })   

    }
    


}

export =  new Notification_sub_proccess()
