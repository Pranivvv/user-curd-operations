import sql from 'mssql'
import dotenv from 'dotenv'

dotenv.config() //initialize environment variables from .env

//Database configuration information
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true, 
    trustServerCertificate: true 
  }
}

// creating database object
const dbConn = async () => {
    try{
        await sql.connect(dbConfig)
        console.log('connected to db')
    }
    catch(error){
        console.error(error)
    }
}

export default dbConn