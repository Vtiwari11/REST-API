const  config = require('../dbConfig/dbConfig');
const  sql = require('mssql');
const express = require('express');
const router = express.Router();
const  bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app=express(); 


require('dotenv').config();


async  function  getdetails(req,res) {

    try {
     let  pool = await  sql.connect(config);
     let  fristdb = await  pool.request().query("SELECT * from login");
     res.send(fristdb.recordset)
     
    
  }
  catch (error) {
    console.log("vedika")
    console.log(error);
  }
}
//-----------------display data----------//
async  function  getdata(req,res) {
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

     console.log(fristdb.recordset[0].email);
     console.log(fristdb.recordset[0].passward);  
    if(fristdb.recordset[0])
    {
     
      if(email==fristdb.recordset[0].email){
        
        if(password==fristdb.recordset[0].passward)
        {
         // res.send(req.body.email);
         // res.send(req.body.passward);
    
        //   const token = jwt.sign({ passward: password }, process.env.JWT_SECRET, {
        //     expiresIn: process.env.JWT_EXPIRES_IN,
        //   });
        
        //   res.status(201).json({
        //     status: 'success',
        //     token,
        //     data: {
        //       newUser,
        //     },
        //   });
        // };

        console.log(  process.env.JWT_TOKEN);

       const user={}
          const token = jwt.sign(
            { password:password, email },
          //  'CELEBALKSKDIJFNKMDJNKMKDLKJDKLKDJ', 
         process.env.JWT_TOKEN,      
             {
             
                expiresIn: "2h",
            }
          );
    
          // save user token
          user.token = token;
           res.json(token);
        
        
        
    //     }
      }

      else{
        res.json("invalid email or password");
      }
    }
    else{
      res.json("user doesn't exist");
    }
  }
  }
  catch (err) {
    console.log(err);
    res.json("nah hua");
  }
}

// async  function  token (req,res) {
//     console.log(req.body)
//     try {
//       let  pool = await  sql.connect(config);
//          const { email, password } = req.body;
      
//           // Validate user input
//           if (!(email && password)) {
//             res.status(400).send("All input is required");
//           }
//           // Validate if user exist in our database
//           const user = await User.findOne({ email });
      
//           if (user && (await bcrypt.compare(password, user.password))) {
//             // Create token
//             const token = jwt.sign(
//               { user_id: user._id, email },
//               process.env.TOKEN_KEY,
//               {
//                 expiresIn: "2h",
//               }
//             );
      
//             // save user token
//             user.token = token;
      
//             // user
//             res.status(200).json(user);
//           }
//           res.status(400).send("Invalid Credentials");
//         } catch (err) {
//           console.log(err);
//         }
//         // Our register logic ends here
//       };
      




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