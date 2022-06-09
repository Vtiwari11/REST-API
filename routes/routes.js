const  express = require('express');
const  router = express.Router();


 
 const db=require('../controller/controller')

 router.post('/register',db.register);
router.get('/login',db.login);
router.delete('/delete',db.del);
router.get('/details',db.getdetails);
 
module.exports=router