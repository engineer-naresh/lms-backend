import type { Response } from "express";
import type { IExtendedRequest } from "../../../src/middleware/type.ts";
import { QueryTypes } from "sequelize";
import sequelize from "../../../src/database/connection.ts";
import { Where } from "sequelize/lib/utils";
const createCategory = async (req:IExtendedRequest, res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber;
    const {categoryName, categoryDescripton} = req.body
    if(!categoryName || !categoryDescripton){
        res.status(403).json({
            message:"Please Insert category name and categoryDescription"
        })
    }else{
        await sequelize.query(`INSERT INTO "category_${instituteNumber}" ("categoryName", "categoryDescription") VALUES ($1,$2)`,
            {
            bind:[categoryName, categoryDescripton],
            type:QueryTypes.INSERT
            })
            res.status(200).json({
                message:"Category added succesfully"
            })
    }
}

const getCategories = async (req:IExtendedRequest,res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber;
    const categories = await sequelize.query(`SELECT * FROM "category_${instituteNumber}"`);
    if(categories){
        res.status(200).json({
            data:categories
        })
    }
}

const deleteCategory = async (req:IExtendedRequest,res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber;
    const id = req.params.id;
    const categories = await sequelize.query(`DELETE FROM "category_${instituteNumber}" WHERE id = $1`,
        {
            bind: [id],
            type:QueryTypes.DELETE
        }
    )
    res.status(200).json({
        message:"category deleted successfully"
    })
}
export {createCategory,getCategories,deleteCategory}