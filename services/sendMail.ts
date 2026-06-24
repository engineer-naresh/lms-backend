import nodemailer from 'nodemailer';
import { config } from 'dotenv';
config();
interface ImailInformation{
    to:string,
    subject:string,
    text:string
}
const sendMail = async (mailInformation:ImailInformation) => {
    //mail configuration
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_gmail,
            pass: process.env.NODEMAILER_pass,
        }
    })
    //mail format
    const mailFormatObject = {
        from: "LMS <nareshcodes@gmail.com>",
        to: mailInformation.to,
        subject: mailInformation.subject,
        html: mailInformation.text
    }
    try {
        await transporter.sendMail(mailFormatObject)
    } catch (error) {
        console.log (error);
    }
}
export default sendMail