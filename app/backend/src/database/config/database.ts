import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'TRYBE_FUTEBOL_CLUBE',
    host: process.env.DB_HOST,
    port: 3002 ,
    dialect: 'mysql',
}

exports = config;
