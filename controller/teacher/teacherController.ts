import type { Request, Response } from "express";
import sequelize from "../../src/database/connection.ts";
import { QueryTypes } from "sequelize";
import bcrypt from 'bcrypt';
import generateJWTToken from "../../services/generateJwtToken.ts";
interface IteacherData{
    teacherPassword: string,
    teacherInstituteNumber:string,
    id:string
}
const teacherLogin = async (req:Request,res:Response)=>{
const {teacherEmail,teacherPassword,teacherInstituteNumber} = req.body;
if(!teacherEmail || !teacherPassword || !teacherInstituteNumber){
    res.status(400).json({
        message:"Please provide teacher email, teacher password and institute number."
    })
}

const teacherData:IteacherData[] = await sequelize.query(`SELECT * FROM teacher_${teacherInstituteNumber} WHERE "teacherEmail" = $1`,{
    bind:[teacherEmail],
    type:QueryTypes.SELECT
})
    if(teacherData[0]==undefined){
        res.status(400).json({
            message:"Invalid Credentials"
        })
        return
    }

    if(teacherData.length==0){
    return res.status(400).json({
        message:"Invalid Credentials."
    })
    }

   const isPasswordMatched =  bcrypt.compareSync(teacherPassword,teacherData[0].teacherPassword);
    
  if(!isPasswordMatched){
    res.status(404).json({
        message:"Invalid credentials"
    })
  }else{
   const token =  generateJWTToken({id:teacherData[0].id,instituteNumber:teacherInstituteNumber});
    res.status(200).json({
        message:"Logged in successfully.",
        token:token
    })
}
} 
export {teacherLogin};