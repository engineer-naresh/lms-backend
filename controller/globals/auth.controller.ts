import type { Request, Response } from 'express';
import User from '../../src/database/models/user.model.ts';

const registerUser = async (req:Request ,res:Response)=>{
if(req.body==undefined){
    console.log("Data not received");
   res.status(400).json({
    "message": "Data not received"
   })
}    
const {username, email, password}=req.body;
if(!username|| !email || !password){
    res.status(400).json({
        message: "Please provide username, email and password."
    })
}else{
   await User.create({
        username:username,
        email:email,
        password:password
    })
    res.status(201).json({
        message: "User created successfully."
    });

}
}
export default registerUser