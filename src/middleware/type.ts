export interface IExtendedRequest extends Request {
    params: any
    user?: {
        id:string,
        email: string,
        role: string,
        username: string | null,
        currentInstituteNumber:string
    }

}