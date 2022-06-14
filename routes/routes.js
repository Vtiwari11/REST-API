const  express = require('express');
const  router = express.Router();
const auth = require("../middleware/auth");
const db=require('../controller/controller')



router.get('/data',db.getdata);
router.post('/register',db.register);
router.get('/login',db.login);
router.delete('/delete',db.del);
router.post("/welcome", auth,db.welcome);


module.exports=router