const express = require('express');
const app = express();
const cors = require('cors')
require('../server/DB/connection')

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(
    cors({
        origin: "http://localhost:5173", // <-- location of the react app were connecting to
        credentials: true,
    })
);

//registed the routes
let basepath ='';
app.use(basepath+'/api',  require('./routes/logRoute'));


let port = 3000
app.listen(port,()=>{
    console.log(`server is running at ${port}..`);
})