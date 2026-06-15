import type { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import User from "../database/models/user.model.ts";
interface IExtendedRequest extends Request {
    user?: {
        id:string,
        email: string,
        role: string,
        username: string | null,
    }
}

const isLoggedIn = async (req: IExtendedRequest, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(403).json({
            message: "Unauthorized"
        })
        return
    }
    jwt.verify(token, 'secrettoken', async (error, result: any) => {
        if (error) {
            res.status(403).json({
                message: "Token"
            })
        } else {
            const userData = await User.findByPk(result.id);
            if (!userData) {
                res.status(403).json({
                    message: "No user with token , invalid token"
                })
            } else {
                req.user = userData;
                
                next();
            }

        }
    })
}
export default isLoggedIn;