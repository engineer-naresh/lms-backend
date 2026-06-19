import express, { Router }  from "express";
import asyncErrorHandler from "../../../services/asyncErrorHandler.ts";
import isLoggedIn from "../../../src/middleware/middleware.ts";
import { createCategory, deleteCategory, getCategories } from "../../../controller/institute/category/category.controller.ts";
const router:Router = express.Router();
router.route('/category').post(asyncErrorHandler(isLoggedIn),asyncErrorHandler(createCategory)).get(asyncErrorHandler(isLoggedIn),asyncErrorHandler(getCategories));
router.route('/delete/:id').delete(asyncErrorHandler(isLoggedIn),asyncErrorHandler(deleteCategory));
export default router;