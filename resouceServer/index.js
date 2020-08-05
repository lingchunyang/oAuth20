const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const patientRoute = require('./patientProtocol');

dotenv.config();
const app = express();

app.use(express.json());

//Db config
mongoose.connect('mongodb://127.0.0.1:27017/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function(err){
    if(!err) {
        console.log('Connected to database')
    } else {
        console.log('Could not connect to Database: ', err);
    }
});

app.use('/patient', patientRoute);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
