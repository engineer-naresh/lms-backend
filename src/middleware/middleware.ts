import type {Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
class Middleware{
    static isLoggedIn(req:Request, res:Response, next:NextFunction){
        const token = req.headers.authorization;
        if(!token){
            res.status(401).json({
                message: "Unauthorized"
            })
            return
        }else{
            jwt.verify(token,'secrettoken',function(error,result){
                if(error){
                    res.status(403).json({
                        message:"Token invalid"
                    })
                }else{
                     console.log(result, "Result obtained");
                    
                }
            })
            next();
        }
    }   
    static restricTo(req:Request, res:Response){

    }
}
export default Middleware;