import mysql2 from "mysql2"
import dotenv from "dotenv"

dotenv.config()

export const db = mysql2.createConnection({
  host: process.env.DB_CONNECT_HOST,
  user: process.env.DB_CONNECT_USER,
  password: process.env.DB_CONNECT_PASSWORD,
  database: process.env.DB_CONNECT_DB
})
