import type {Request, Response } from "express";
import type { IExtendedRequest } from "../../../src/middleware/type.ts";
import { QueryTypes } from "sequelize";
import sequelize from "../../../src/database/connection.ts";
const createCategory = async (req:IExtendedRequest, res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber
     const {categoryName, categoryDescription} = req.body
    if(!categoryName || !categoryDescription){
        res.status(404).json({
            message:"Please Insert category name and categoryDescription"
        })
    }else{
        await sequelize.query(`INSERT INTO "category_${instituteNumber}" ("categoryName", "categoryDescription") VALUES ($1,$2)`,
            {
            bind:[categoryName,categoryDescription],
            type:QueryTypes.INSERT
            })
            res.status(200).json({
                message:"Category added succesfully"
            })
    }
   
}


const getCategories = async (req:IExtendedRequest,res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber;
    const categories = await sequelize.query(`SELECT * FROM "category_${instituteNumber}"`,
        {
            type:QueryTypes.SELECT
        }
    );
        res.status(200).json({
            datas:categories
        })
};

const deleteCategory = async (req:IExtendedRequest,res:Response)=>{
    const instituteNumber = req.user?.currentInstituteNumber;
    const id = req.params.id;
   await sequelize.query(
    `DELETE FROM "category_${instituteNumber}" WHERE id = $1`,
    {
        bind: [id],
        type: QueryTypes.DELETE,
    }
);
return res.status(200).json({
    message:"Deleted record succcessfully"
})
}

export {createCategory,getCategories, deleteCategory}