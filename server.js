
const  express = require('express');
const  bodyParser = require('body-parser');
const  app = express();
const allroutes=require('./routes/routes');


app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use('/api', allroutes);

app.listen(4000, function (err, res) {
    if(err){
        console.log('Server is not running..');
    }
    else{
        console.log("Running..")
    }
});
