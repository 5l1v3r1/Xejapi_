import { Request, Response, NextFunction, Application } from 'express';
import { resolve } from 'path';
import * as utils from '../utils/utils';


interface Register {
    username: string,
    email: any,
    password: any,
    re_password: any
};


interface Login {
    username: string,
    password: string,

};



class User_Proccess {
    register = (req: Request, res: Response, next: NextFunction) => {
        const register: Register = req.body;
        const query_string_check: any = `SELECT id FROM users WHERE username = ? or email = ? `

        if (utils.is_valid_email(register.email) == true) {
            const query = utils.db.query(query_string_check, [register.username, register.email], (error: Error, result: Object[]) => {
                if (error) {
                    res.status(400).json({
                        ok: false,
                        error,
                    });
                }
                if (result[0]) {
                    console.log('[register]: ', result);
                    res.status(400).json({ status: false, msg: 'user-already' });
                    return next();
                }
                else {
                    const query_string: string = "insert into users (username, email, password, re_password) VALUES ( ?, ?, ?, ?) ";
                    const rex = utils.db.query(query_string, [register.username, register.email, register.password, register.re_password], (error: Error, result: Object[]) => {
                        if (error) {
                            res.status(400).json({
                                ok: false,
                                error,
                            });
                        }
                        else {
                            res.status(200).json({ status: true, msg: 'user-saved' });
                            return next();
                        }
                    });


                }
            })

        }
        else { return res.status(400).json({ status: false, msg: 'wrong-email' }); }

    };

    login = (req: Request, res: Response, next: NextFunction) => {
        const login: Login = req.body; // username, password 
        utils.db.query(`SELECT id FROM users WHERE username =  ? and password = ?`, [login.username, login.password], (error: Error, result: Object[]) => {
            if (error) {
                res.status(400).json({
                    ok: false,
                    error,
                });
            }
            if (result[0]) {
                console.log('[login]: ', result)
                res.json({ status: true, msg: 'user-loggedIn' });
                return next();
            }
            else {

                return res.json({ status: false, msg: 'user-notFound' });
            }
        });


    };

};
export = new User_Proccess()