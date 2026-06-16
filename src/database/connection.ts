import { Sequelize } from 'sequelize-typescript';
import envConfig from '../config/config.ts';
import models from './models/user.model.ts';
const DB_URL = envConfig.databaseUrl;
import { config } from "dotenv";
config();
const sequelize = new Sequelize(`${DB_URL}`, {
   dialect: 'postgres',
   logging: console.log,
   timezone: '+05:45',
   models: [models],
});
sequelize.authenticate().then(() => {
   console.log("Database connected succesfully");
}).catch((error) => {
   console.log("Database connection failed" + error)
})
sequelize.sync({ alter: true })
.then(() => { console.log("Migration successfull") })
.catch((error)=>{
   console.log("Migration failed" + error)
});
export default sequelize;