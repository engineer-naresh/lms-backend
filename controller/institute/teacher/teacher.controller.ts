import type { Response } from "express";
import type { IExtendedRequest } from "../../../src/middleware/type.ts";
import sequelize from "../../../src/database/connection.ts";
import { QueryTypes } from "sequelize";
import generateRandomPassword from "../../../services/generateRandomPassword.ts";
const createTeacher = async(req:IExtendedRequest,res:Response)=>{
const instituteNumber = req.user?.currentInstituteNumber;
const teacherPhoto = req.file?req.file.path:"https://static.vecteezy.com/system/resources/thumbnails/001/840/618/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
const {teacherName,teacherEmail, teacherPhoneNumber, teacherExpertise, joinedDate , salary, teacherPassword,courseId} =req.body;
    if(!teacherName || !teacherEmail || !teacherPhoneNumber || !teacherExpertise || !joinedDate || !salary || !teacherPassword ||! courseId){
       return res.status(404).json({
            message:"Teacher name, teacher email, teacherphonenumber, teacher expertise, teacher salary, teacher joined date, teacher Password is required field"
        })
        
    }
        const data = generateRandomPassword(teacherName);
        await sequelize.query(`INSERT INTO "teacher_${instituteNumber}" ("teacherName", "teacherEmail", "teacherPhoneNumber", "teacherExpertise", "joinedDate", "salary", "teacherPhoto", "teacherPassword", "courseId") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
            {
                bind:[teacherName,teacherEmail, teacherPhoneNumber, teacherExpertise, joinedDate , salary, teacherPhoto,  data.hashedVersion, courseId],
                type:QueryTypes.INSERT
            }
        )
        //send mail later
        const teacherData :{id:String}[]=await sequelize.query(`SELECT id from "teacher_${instituteNumber}" where "teacherEmail" = $1`,
            {
                bind:[teacherEmail],
                type:QueryTypes.SELECT
            }
        )
        await sequelize.query(`UPDATE "course_${instituteNumber}" SET "teacherId" = $1 WHERE id = $2`,{
            bind:[teacherData[0]?.id, courseId],
            type:QueryTypes.UPDATE
        })

        res.status(200).json({
            message:"Teacher created"
        })
    
}
const getTeachers = async (req:IExtendedRequest,res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber;
    const teachers = await sequelize.query(`SELECT * FROM "teacher_${instituteNumber}"`,
        {
            type:QueryTypes.SELECT
        }
    )
    res.status(200).json({
        message:"teachers fetched",
        data:teachers
    })

}

const deleteTeacher = async (req:IExtendedRequest, res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber;
    const id = req.params.id;
    await sequelize.query(`DELETE FROM "teacher_${instituteNumber}" where id = $1`,
        {
            bind:[id],
            type:QueryTypes.DELETE
        }
    )
    res.status(200).json({
        message:"Teacher Deleted Succesfully"
    })
}

export {createTeacher,getTeachers, deleteTeacher};