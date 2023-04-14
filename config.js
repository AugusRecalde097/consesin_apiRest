import dotenv from 'dotenv'
dotenv.config();

export const PORT = process.env.PORT || 8080
export const MYSQL_DB= process.env.MYSQL_DB || 'consesin'
export const MYSQL_USER= process.env.MYSQL_USER || 'root'
export const MYSQL_HOST= process.env.MYSQL_HOST || 'localhost'
export const MYSQL_PASS= process.env.MYSQL_PASS || ''