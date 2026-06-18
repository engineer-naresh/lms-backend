import type { Request } from 'express';

export interface IExtendedRequest extends Request {
    params: any,
    user?: {
        id:string,
        email: string,
        role: string,
        username: string | null,
        currentInstituteNumber:string
    },
    file?: Express.Multer.File;
    files?: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] };

}