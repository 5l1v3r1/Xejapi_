import { Request, Response, NextFunction, Application } from 'express';
import * as types from '../selftypes/types';
import * as utils from '../utils/utils';


class Get_db 
{
    get_all_db = (req: Request, res: Response, next: NextFunction) => 
    {   
      const table_name: any = req.body.table_name;

      const get_data = utils.db.query(`select * from ${table_name}`, (error: Error, result: Object[]) => 
      {
        res.status(200).json({ok: true, result})
        return next();
      })  
    }

    get_users = (req: Request, res: Response, next: NextFunction) =>  
      {

      utils.db.query(`select * from users where users.id =  ?`, [req.body.userid], (error: Error, result: Object[]) => 
      {
        if (error) { res.status(400).json({ok: false, error})}
        else 
        {
          res.status(200).json({ok: true, result})
        }
      })
      
    }
    get_follows = (req: Request, res: Response, next: NextFunction) =>  
      {

      utils.db.query(`select * from follow_ups where id = ?`, [req.body.id], (error: Error, result: Object[]) => 
      {
        if (error) { res.status(400).json({ok: false, error})}
        else 
        {
          res.status(200).json({ok: true, result})
        }
      })
      
    }

    get_likes = (req: Request, res: Response, next: NextFunction) =>  
    {

    utils.db.query(`select * from likes where userID =  ?`, [req.body.userid],  (error: Error, result: Object[]) => 
    {
      if (error) { res.status(400).json({ok: false, error})}
      else 
      {
        res.status(200).json({ok: true, result})
      }
    })
    
  }

  get_blocked = (req: Request, res: Response, next: NextFunction) =>  
  {

    utils.db.query(`select * from block_ups where id =  ?`, [req.body.id], (error: Error, result: Object[]) => 
    {
      if (error) { res.status(400).json({ok: false, error})}
      else 
      {
        res.status(200).json({ok: true, result})
      }
    })
    
  }
  get_notification = (req: Request, res: Response, next: NextFunction) =>  
      {

      utils.db.query(`select * from notification where id = ?`, [req.body.id],  (error: Error, result: Object[]) => 
      {
        if (error) { res.status(400).json({ok: false, error})}
        else 
        {
          res.status(200).json({ok: true, result})
        }
      })  
  }

  get_posts = (req: Request, res: Response, next: NextFunction) =>  
  {

    utils.db.query('select * from posts where userID = ? or id = ?', [req.body.userid, req.body.id],  (error: Error, result: Object[]) => 
    {
      if (error) { res.status(400).json({ok: false, error})}
      else {
          res.status(200).json({ok: true, result})
      }
    })
  }
  
  get_comments = (req: Request, res: Response, next: NextFunction) =>  
    {

    utils.db.query('select * from comments where userID = ? or id = ?', [req.body.userid, req.body.id], (error: Error, result: Object[]) => 
    {
      if (error) { res.status(400).json({ok: false, error})}
      else {
          res.status(200).json({ok: true, result})
      }
    })
    
  }

  get_recomments = (req: Request, res: Response, next: NextFunction) =>  
    {

    utils.db.query('select * from reply_comments where userID = ? or id = ?', [req.body.userid, req.body.id], (error: Error, result: Object[]) => 
    {
      if (error) { res.status(400).json({ok: false, error})}
      else {
          res.status(200).json({ok: true, result})
      }
    })
    
  }
   
}

export =  new Get_db()
