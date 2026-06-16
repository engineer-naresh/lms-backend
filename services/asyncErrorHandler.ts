import type { Request, Response, NextFunction } from "express"
interface IExtendedRequest extends Request {
    user?: {
        id:string,
        email: string,
        role: string,
        username: string | null,
    }
}
const asyncErrorHandler = (fn: Function) => {
    return (req: IExtendedRequest, res: Response, next: NextFunction) => {

        fn(req,res, next).catch((err: Error) => {
            res.status(500).json({
                message: err.message,
                error:err
            })}
        )
    }
}
export default asyncErrorHandler;