const express=require('express');
const bodyparser=require('body-parser');

// create express app
const app = express();

// setup port
const port = process.env.PORT||4000;

app.use(bodyparser.urlencoded({extended: true}))

app.use(bodyparser.json())


// config the database
const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database.', err);
  process.exit();
});


app.get('/',(req,res)=>{
    res.json({"message":"hello world"});
});


// Require Users routes
const userRoutes = require('./routes/user.routes')
// using as middleware
app.use('/api/users', userRoutes)

app.listen(port,function (err) {
    if(err){
        console.log("error",err)
    }
    console.log("server is up and running;",port)
    
});