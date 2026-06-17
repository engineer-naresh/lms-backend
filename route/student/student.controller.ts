import { QueryTypes } from "sequelize";
import type {Response} from 'express';
import sequelize from "../../src/database/connection.ts";
import type { IExtendedRequest } from "../../src/middleware/type.ts";

const getStudents = async (req:IExtendedRequest, res:Response)=>{
const instituteNumber = req.user?.currentInstituteNumber;
const students = await sequelize.query(`SELECT * FROM "student_${instituteNumber}",
    {
        type: QueryTypes.SELECT
    }
`);
    res.status(200).json({
        message: "Students fetched successfully!",
        data:students || []
    });

}
export {getStudents};