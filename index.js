const express = require ('express');
require('dotenv').config();
const morgan = require('morgan');
const mongoose = require ('mongoose');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');

const PORT = process.env.PORT||8000;
const app = express();

//middleware
app.use(morgan('dev'));
app.use (bodyParser.json());

//routes
//secret might need capitalization
app.use('/api', expressJwt({secret:process.env.SECRET}));
// app.use('/api/users', require('./routes/usersRoute'));
// app.use('/api/scholarships/', require('./routes/scholarshipsRoute'));
// app.use('/api/accounts',require('./routes/accountsRoute'));
// app.use('/api/crawls', require('./routes/crawlsRoute'));
app.use('/auth', require('./routes/authRoute'));

const db = process.env.MONGOOSE_URL || 'mongodb://localhost:27017/collegeDestinys';
//connect to db
mongoose.Promise = global.Promise;
mongoose.connect(db, (err)=>{
    if(err) throw err;
console.log("Hell Yeah, youre DB is connected!")})

app.listen(PORT, ()=>{
    console.log("Server is running on PORT " + PORT)
})
