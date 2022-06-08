// const  db = require('./dbconfig');
const db=require('./dbop');
const  express = require('express');
const  bodyParser = require('body-parser');
const  cors = require('cors');
const  app = express();
const  router = express.Router();
app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
 
app.use(cors());
app.use('/api', router);
 
 
router.route('/details').get((request, response) => {

  db.getdetails().then((data) => {
    response.json(data[0]);
  })
})

router.route('/data/:email').get((request, response) => {
  db.getdata(request.params.email).then((data) => {
    response.json(data[0]);
  })
})

router.post("/",db.register);
router.get("/",db.login);
router.delete("/",db.del);
  




const  port = process.env.PORT || 5000;
app.listen(port);
console.log('Order API is runnning at ' + port);