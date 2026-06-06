import { Sequelize } from 'sequelize-typescript';
import envConfig from '../config/config.ts';
import User from './models/user.model.ts';
const DB_URL = envConfig.databaseUrl;
const sequelize = new Sequelize(`${DB_URL}`, {
   dialect: 'postgres',
   logging: false,
   models: [User],
});
sequelize.authenticate().then(() => {
   console.log("Database connected succesfully");
}).catch((error) => {
   console.log("Database connection failed" + error)
})
sequelize.sync({ alter: false })
.then(() => { console.log("Migration successfull") })
.catch((error)=>{
   console.log("Migration failed" + error)
});
export default sequelize;