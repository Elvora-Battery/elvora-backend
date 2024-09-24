import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const db = new Sequelize(process.env.MYSQL_DB, process.env.DB_USER, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect:"mysql",
    port: 3306,
    dialectOptions: {
        connectTimeout: 60000, // waktu timeout dalam milidetik
    },
})

export default db;