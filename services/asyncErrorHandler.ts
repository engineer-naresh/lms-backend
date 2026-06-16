import type { Request, Response, NextFunction } from "express"

const asyncErrorHandler = (fn: Function) => {
    return (res: Response, req: Request, next: NextFunction) => {

        fn(res, req, next).catch((err: Error) => {
            res.status(500).json({
                error: err.message,
                fullerror: err
            }
            )
        })
    }
}
export default asyncErrorHandler;