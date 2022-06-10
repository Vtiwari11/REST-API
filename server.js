
const  express = require('express');
const  bodyParser = require('body-parser');
const  app = express();

const allroutes=require('./routes/routes');

app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
 

app.use('/api', allroutes);



const server = app.listen(5000, function () {
    console.log('Server is running..');
});
