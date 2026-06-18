import type { NextFunction, Request, Response } from 'express';
import sequelize from '../../src/database/connection.ts';
import generateRandomNumber from '../../services/generateRandomNumber.ts';
import { QueryTypes } from 'sequelize';
import User from '../../src/database/models/user.model.ts';
interface IExtendedRequest extends Request {
    user?: {
        id: string,
        userId:string,
        email: string,
        role: string,
        username: string | null,
    },
    instituteNumber?: string | number
}
const createInstitute = async (req: IExtendedRequest, res: Response, next: NextFunction) => {

    const { instituteName, instituteEmail, institutePhoneNumber, instituteAddress } = req.body;
    const instituteVatNo = req.body.instituteVatNo || null;
    const institutePanVatNo = req.body.institutePanVatNo || null;
    if (!instituteName || !instituteEmail || !institutePhoneNumber || !instituteAddress) {
      return res.status(400).json({
            message: "Please provide institute Name, instituteEmail, institutePhoneNumber, instituteAddress"
        })
        return 
    }

    const instituteCode = generateRandomNumber();
    // 1. Enable the built-in Supabase extension (only need to do this once per database)
    // await sequelize.query(`CREATE EXTENSION IF NOT EXISTS moddatetime SCHEMA extensions;`);
    await sequelize.query(`CREATE TABLE IF NOT EXISTS "institute_${instituteCode}" (
    id SERIAL PRIMARY KEY,
    "instituteName" VARCHAR(255) NOT NULL,
    "instituteEmail" VARCHAR(255) NOT NULL,
    "institutePhoneNumber" VARCHAR(255) NOT NULL,
    "instituteAddress" VARCHAR(255) NOT NULL,
    "instituteVatNo" VARCHAR(255),
    "institutePanVatNo" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);

    // // 3. Apply the built-in Supabase trigger to your updatedAt column
    // await sequelize.query(`
    //     CREATE TRIGGER handle_updated_at BEFORE UPDATE ON institute
    //     FOR EACH ROW EXECUTE PROCEDURE extensions.moddatetime("updatedAt");
    // `);
    await sequelize.query(
        `INSERT INTO "institute_${instituteCode}" 
    ("instituteName", "instituteEmail", "institutePhoneNumber", "instituteAddress", "instituteVatNo", "institutePanVatNo") 
    VALUES ($1, $2, $3, $4, $5, $6)`,
        {
            bind: [instituteName, instituteEmail, institutePhoneNumber, instituteAddress, instituteVatNo, institutePanVatNo],
            type: QueryTypes.INSERT,// Optional: Good practice to tell Sequelize what type of query it is
        }
    )
    //history of institute created by user
        sequelize.query(`CREATE TABLE IF NOT EXISTS "user_institute"(
            id SERIAL PRIMARY KEY,
            "userId" UUID references users(id),
            "instituteNumber" VARCHAR(255) UNIQUE
            )`)
    if (req.user) {
        // const user =  await User.findByPk(req.user.id)
        // if(user){
        // user.currentInstituteNumber = "institute_${instituteCode}" ;
        // await user.save();
        // }
        sequelize.query(`INSERT INTO "user_institute" ("userId", "instituteNumber") VALUES ($1, $2)`,
            {
                bind: [req.user.id, instituteCode],
                type: QueryTypes.INSERT
            }
        )
        await User.update({ currentInstituteNumber: instituteCode,
            role:"institute"
         }, { where: { id: req.user.id } })
    }

    req.instituteNumber = instituteCode;
next();
}

const createTeacher = async (req: IExtendedRequest, res: Response, next: NextFunction) => {
const instituteNumber = req.instituteNumber;
await sequelize.query(`CREATE TABLE IF NOT EXISTS "teacher_${instituteNumber}" (
    id SERIAL PRIMARY KEY,
    "teacherName" VARCHAR(255) NOT NULL,
    "teacherEmail" VARCHAR(255) NOT NULL UNIQUE,
    "teacherPhoneNumber" VARCHAR(255) NOT NULL UNIQUE,
    "teacherExpertise" VARCHAR(255),
    "joinedDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP::date,
    "salary" VARCHAR(100),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);
next();
}


const createStudent = async (req: IExtendedRequest, res: Response, next: NextFunction) => {
const instituteNumber = req.instituteNumber;
await sequelize.query(`CREATE TABLE IF NOT EXISTS "student_${instituteNumber}" (
    id SERIAL PRIMARY KEY,
    "studentName" VARCHAR(255) NOT NULL,
    "studentPhoneNumber" VARCHAR(255) NOT NULL UNIQUE,
    "studentAddress" TEXT,
    "enrolledDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP::date,
    "studentImage" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP

)`);
next();
}

const createCourse = async (req: IExtendedRequest, res: Response) => {
const instituteNumber = req.instituteNumber;
await sequelize.query(`CREATE TABLE IF NOT EXISTS "course_${instituteNumber}" (
    id SERIAL PRIMARY KEY,
    "courseName" VARCHAR(255) NOT NULL,
    "coursePrice" VARCHAR(255) NOT NULL,
    "courseDuration" VARCHAR(255) NOT NULL ,
    "courseDescription" TEXT,
    "courseLevel" VARCHAR(255) NOT NULL CHECK ("courseLevel" IN ('beginner', 'intermediate', 'advanced')),
    "courseThumbnail" VARCHAR(255),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);
 res.status(201).json({
        message: "course created successfully!",
        instituteNumber
    })
}
export {createInstitute, createTeacher, createStudent, createCourse};