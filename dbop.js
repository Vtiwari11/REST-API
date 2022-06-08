const  config = require('./dbConfig');
const  sql = require('mssql');
const express = require('express');
const router = express.Router();
//const jwt = require('jsonwebtoken');
async  function  getdetails() {
  try {
     let  pool = await  sql.connect(config);
     let  fristdb = await  pool.request().query("SELECT * from login");
     return  fristdb.recordsets;
  }
  catch (error) {
    console.log("vedika")
    console.log(error);
  }
}
//-----------------display data----------//
async  function  getdata() {
  try {
    let  pool = await  sql.connect(config);
    let  fristdb = await  pool.request().input('input_parameter', sql.VarChar, loginmail).query("SELECT * from login where email = neha@123gmail.com");
    return  fristdb.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}
//--------------------registerAPI----------------//
async  function  register(req,res) {
  console.log(req.body);
  try {
    let  pool = await  sql.connect(config);
    let  insertfristdb = await  pool.request()
    .input('username', sql.VarChar, req.body.username)
    .input('email', sql.NVarChar, req.body.email)
   .input('passward', sql.VarChar, req.body.passward)
   .query(`insert into login (username,email,passward)values(@username,@email,@passward)`);

    //return  insertfristdb.recordsets;
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
    let  pool = await  sql.connect(config);
    let  fristdb = await  pool.request().query(`SELECT email,passward from login where email='${req.body.email}'`);

    let email=req.body.email;
    let password=req.body.passward;
    // console.log(fristdb.recordset[0].email);
    // console.log(fristdb.recordset[0].passward);  
    if(fristdb.recordset[0])
    {
     
      if(email==fristdb.recordset[0].email){
        
        if(password==fristdb.recordset[0].passward)
        {
          res.json('success');
        }
      }
      else{
        res.json("invalid email or password");
      }
    }
    else{
      res.json("user doesn't exist");
    }
  }
  catch (err) {
    console.log(err);
    res.json("nah hua");
  }
}
  
 //--------------------------delete the data---------------------//
async  function  del(req,res) {
  try {
    let  pool = await  sql.connect(config);
    //const person = await Person.delete(req.params.id, req.body);

    let  firstdb = await  pool.request().query(`DELETE FROM login WHERE email='neha@123gmail.com'`);
    //return  fristdb.recordsets;
    res.json('success');
  }
  catch (error) {
    console.log(error);
  }
}
module.exports = {
getdetails,
getdata, register,del,login
}