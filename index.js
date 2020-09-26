require('dotenv').config();

const PORT = 3000;
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
server.use(bodyParser.json());
const morgan = require('morgan');
server.use(morgan('dev'));
const apiRouter = require('./api');
server.use('/api', apiRouter);
const { client } = require('./db');
client.connect();


server.use((req, res, next) => {
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");
  
    next();
  });



//ADDED DURING LECTURE, instead of api index
apiRouter.use((error, req, res, next) => {
  res.send(error);
});

// app.get('*',(req, res, next) =>{
//   res.status(404).send('Opps!');
// })

server.listen(PORT, () => {
    console.log('The server is up on port', PORT)
});