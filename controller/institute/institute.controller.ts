import type { Request, Response } from 'express';
import sequelize from '../../src/database/connection.ts';
const createInstitute = async(req: Request, res: Response)=>{
        const { instituteName, instituteEmail, institutePhoneNumber, instituteAddress } = req.body;
        const instituteVatNo= req.body.instituteVatNo || null;
        const institutePanVatNo= req.body.institutePanVatNo || null;
        if(!instituteName || !instituteEmail || !institutePhoneNumber || !instituteAddress){
            res.status(400).json({
                message:"Please provide institute Name, instituteEmail, institutePhoneNumber, instituteAddress"
            })
            return 
        }
        // 1. Enable the built-in Supabase extension (only need to do this once per database)
    await sequelize.query(`CREATE EXTENSION IF NOT EXISTS moddatetime SCHEMA extensions;`);
       await sequelize.query(`CREATE TABLE institute (
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

    // 3. Apply the built-in Supabase trigger to your updatedAt column
    await sequelize.query(`
        CREATE TRIGGER handle_updated_at BEFORE UPDATE ON institute
        FOR EACH ROW EXECUTE PROCEDURE extensions.moddatetime("updatedAt");
    `);
        res.status(200).json({
            message:"Institute created successfully!"
        })
    }   
export default createInstitute;