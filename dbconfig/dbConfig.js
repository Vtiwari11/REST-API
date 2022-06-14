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
  const pool = new sql.ConnectionPool(config);
  pool.connect()
  
  module.exports = pool;


