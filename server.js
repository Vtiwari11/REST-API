
const  express = require('express');
const  bodyParser = require('body-parser');
const  app = express();
const  router = express.Router();
const allroutes=require('./routes/routes')

app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
 

app.use('/api', allroutes);




const  port =  5000;
app.listen(port);
console.log('Order API is runnning at ' + port);