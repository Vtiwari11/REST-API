const sql = require('mssql')
const config = {

      server: "DESKTOP-I2H1MEU",
  
      database: "fristdb",
  
      user: "testlogin",
  
      password: "12345678",
  
      "options": {
        "encrypt": true,
        "enableArithAbort": true
        }
   
  };
  

  let  pool =   sql.connect(config);


  module.exports = pool;


