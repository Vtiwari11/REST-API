const  config = require('../dbConfig/dbConfig');
const  sql = require('mssql');
const express = require('express');
// const  bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
const app=express(); 
const pool=require('../dbconfig/dbConfig');
require('dotenv').config();

//-----------------display data----------//

async  function  getdata(req,res) {
  try {
    let  fristdb = await (pool).request().query("SELECT * from login");
      res.send(fristdb.recordset);
  }
  catch (error) {
    console.log(error);
  }
}
//--------------------registerAPI----------------//
async  function  register(req,res) {
  console.log(req.body);
  try {
   let  insertfristdb =(await pool).request()
   .input('username', sql.VarChar, req.body.username)
   .input('email', sql.NVarChar, req.body.email)
   .input('passward', sql.VarChar, req.body.passward)
   .query(`insert into login (username,email,passward)values(@username,@email,@passward)`);
    res.json('success');
  }
  catch (err) {
    console.log(err);
  }
}
//--------------------login----------------//
async  function  login(req,res) {
  console.log(req.body)
  try {
    let  fristdb =(await pool).request().query(`SELECT email,passward from login where email='${req.body.email}'`);
    let email=req.body.email;
    let password=req.body.passward;
    console.log(fristdb)
    if(fristdb.recordset)
    {
    if(email==fristdb.recordset[0].email)
    {
    if(password==fristdb.recordset[0].passward)
    {
    console.log(  process.env.JWT_TOKEN);
    const user={}
    const token = jwt.sign({ password:password, email },
          //  'CELEBALKSKDIJFNKMDJNKMKDLKJDKLKDJ', 
    process.env.JWT_TOKEN,      
    {       
    expiresIn: "2h",
});
    user.token = token
    res.json(token );
      //  res.end();
    }
    else
    { 
    res.json("invalid email or password");
    } 
}
    else
    {
    res.json("user doesn't exist");
}}   }
    catch (err) {
     console.log(err);
     res.json("not done");
  }
}
async  function  welcome(req,res) {
res.status(200).send("Welcome 🙌 ");
};
    //--------------------------delete the data---------------------//
async  function  del(req,res) {
  try {
    let  firstdb = await pool.request().query(`DELETE FROM login WHERE email='${req.body.email}'`);
    res.json('success');
  }
  catch (error) {
    console.log(error);
  }
}
module.exports = {
getdata, register,del,login,welcome
}