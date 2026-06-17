import type { Response } from 'express';
import { QueryTypes } from 'sequelize';
import sequelize from '../../../src/database/connection.ts';
import { type IExtendedRequest } from "../../../src/middleware/type.ts";

const createCourse = async (req: IExtendedRequest, res: Response) => {
    const instituteNumber = req.user?.currentInstituteNumber;
    const { courseName, coursePrice, courseDuration, courseDescription, courseLevel}:any = req.body;
    const courseThumbnail= null
    if (!courseName || !coursePrice || !courseDuration || !courseDescription || !courseLevel) {
        return res.status(400).json({
            message: "Please provide all course details: name, price, duration, description, level, and thumbnail."
        });
    }
    const returnData = await sequelize.query(
        `INSERT INTO "course_${instituteNumber}" 
        ("courseName", "coursePrice", "courseDuration", "courseDescription", "courseLevel", "courseThumbnail") 
        VALUES ($1, $2, $3, $4, $5, $6)`,
        {
            bind: [courseName, coursePrice, courseDuration, courseDescription, courseLevel, courseThumbnail],
            type: QueryTypes.INSERT,
        }
    );
console.log(returnData);
    res.status(201).json({
        message: "Course created successfully!"
    });
}
const deleteCourse = async (req: IExtendedRequest, res: Response) => {
    const instituteNumber = req.user?.currentInstituteNumber;
    const courseId = req.params.id;
    const courseData = await sequelize.query(`SELECT * FROM "course_${instituteNumber}" WHERE id = $1`,
        {
            bind: [courseId],
            type: QueryTypes.SELECT
        }
    );
    if(courseData.length === 0){
        return res.status(404).json({
            message: "Course not found!"
        });
    }
    await sequelize.query(`DELETE FROM "course_${instituteNumber}" WHERE id = $1`,
        {
            bind: [courseId],
            type: QueryTypes.DELETE
        }
    );
    res.status(200).json({
        message: "Course deleted successfully!"
    });
}
const getAllCourse = async (req: IExtendedRequest, res: Response) =>{
    const instituteNumber = req.user?.currentInstituteNumber;
    const courses = await sequelize.query(`SELECT * FROM "course_${instituteNumber}"`,
        {
            type: QueryTypes.SELECT
        }
    );
    res.status(200).json({
        message: "Course fetched successfully!",
        data:courses || []
    });
    
}
const getSingleCourse = async (req: IExtendedRequest, res: Response) =>{
    const instituteNumber = req.user?.currentInstituteNumber;
    const course = await sequelize.query(`SELECT * FROM "course_${instituteNumber}" WHERE id = $1`,
        {
            bind: [req.params.id],
            type: QueryTypes.SELECT
        }
        );
        res.status(200).json({
            message: "Course fetched successfully!",
            data:course || []
        }); 
        
}

export {createCourse, deleteCourse, getAllCourse, getSingleCourse}