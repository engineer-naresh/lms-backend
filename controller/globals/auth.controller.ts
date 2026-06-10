import type { Request, Response } from 'express';
import User from '../../src/database/models/user.model.ts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerUser = async (req: Request, res: Response) => {
    if (req.body == undefined) {
        console.log("Data not received");
        res.status(400).json({
            "message": "Data not received"
        })
    }
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({
            message: "Please provide username, email and password."
        })
    } else {
        await User.create({
            username: username,
            email: email,
            password: bcrypt.hashSync(password, 12)
        })
        res.status(201).json({
            message: "User created successfully."
        });

    }
}
const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            message: "Please provide email and password."
        })
        return
    };

    const data = await User.findAll({
        where: {
            email: email
        }

    });
    if (data.length == 0) {
        res.status(404).json({
            "message": "User not Registered"
        })
    } else {
        const user = data[0];
        if (user && user.password) {
            const isPasswordMatch = bcrypt.compareSync(password, user.password);
            if (isPasswordMatch) {
                const token = jwt.sign({ id: user.id }, 'secrettoken', { expiresIn: "30d" })
                res.json({
                    token:token,
                    message:"logged in success!",
                })
            } else {
                res.status(403).json({
                    "message": "Invalid email or password"
                })
            }

        } else {
            res.status(403).json({
                message: "Invalid user data"
            });
        }
    }
}
export { registerUser, loginUser }