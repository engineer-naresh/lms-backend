import jwt from "jsonwebtoken";
import { config } from 'dotenv';
config();
const generateJWTToken  = (data:{
    id:string,
    instituteNumber?:string
})=>{
    
//    @ts-ignore 
   const token = jwt.sign(data , process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRY_TIME })
    return token;
}
export default generateJWTToken;