import express, { Request, Response, NextFunction, Application, Router } from 'express';
const { json } = require('express');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');



export const requireAuth = (req: Request, res: Response, next: NextFunction) => {

    let token = JSON.stringify(req.cookies.token)
    console.log('midware: ', token)
    if (token != undefined) {
        try {
            jwt.verify(token, req.app.get('SECRET_KEY'));
            return next();
        } catch (e) {
            res.status(401).send({ 'msg': 'unauthorized' });
            return;
        }
    } else {
        res.status(401).send({ 'msg': 'unauthorized' });
        return;
    }
}

export const getCurrentUser = (req: Request, res: Response, next: NextFunction) => {

    const token = req.cookies.token;

    if (token != undefined) {
        try {
            const decoded = jwt.verify(token, req.app.get('SECRET_KEY'));
            res.locals.current_user = decoded;
            return next();
        } catch (e) {
            res.locals.current_user = null;
            return next();
        }
    } else {
        res.locals.current_user = null;
        return next();
    }
};


