import { config } from "dotenv";
config();
const envConfig = {
    portNumber: process.env.PORT,
    databaseUrl: process.env.DATABASE_URL,
}
export default envConfig;
