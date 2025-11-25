// const express = require ('express')
// const { Pool } = require ("pg")
// const app = express ()
// const port = 3030

// app.use(express.json());
// const pool = new Pool ({
//     host : "localhost",
//     port : 5432,
//     user : "postgres",
//     password : "admin",
//     database : "can_db"
// });


// const createTable = async ()=>{

  
//   const query = `CREATE TABLE  IF NOT EXISTS users(
//     id SERIAL PRIMARY KEY,
//     name varchar(255),
//     address varchar(255),
//     profession varchar(255),
//     age int,
//     phoneNumber varchar(20),
//     email varchar(255) NOT NULL UNIQUE,
//     city varchar(255),
//     rating DECIMAL(3,2),
//     description varchar(255),
//     CHECK (email LIKE '%@%.%')

//   )`;

//   await pool.query(query)
// }