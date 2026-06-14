import type { Request, Response } from 'express';
import sequelize from '../../src/database/connection.ts';
import generateRandomNumber from '../../services/generateRandomNumber.ts';
import { QueryTypes } from 'sequelize';

const createInstitute = async (req: Request, res: Response) => {
    const instituteCode = generateRandomNumber();
    const { instituteName, instituteEmail, institutePhoneNumber, instituteAddress } = req.body;
    const instituteVatNo = req.body.instituteVatNo || null;
    const institutePanVatNo = req.body.institutePanVatNo || null;
    if (!instituteName || !instituteEmail || !institutePhoneNumber || !instituteAddress) {
        res.status(400).json({
            message: "Please provide institute Name, instituteEmail, institutePhoneNumber, instituteAddress"
        })
        return
    }
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
res.status(201).json({
    message: "Institute created successfully!"
})
    }

// const createTeacher = async(req:Request, res: Response)=>{
//     await sequelize.query(`CREATE TABLE TEACHER_${instituteCode} (
//         id INT PRIMARY KEY SERIAL,
//         "teacherName" VARCHAR(255) NOT NULL,
//         "teacherEmail" VARCHAR(255) NOT NULL,
//         "teacherPhoneNumber" VARCHAR(255) NOT NULL,

//     )`)
// }    
export default createInstitute;