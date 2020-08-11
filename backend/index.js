
const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const {getJwk} = require("./jwks");
var cors = require('cors');
var cookieParser = require('cookie-parser');

const authRoute = require('./auth');
const patientRoute = require('./patientProtocol');

dotenv.config();
const app = express();

app.use(express.json())

app.use(cors({origin: [
    "http://localhost:4200",
    "http://lingchunyang.s3-website.eu-central-1.amazonaws.com"
  ], credentials: true}));
  
  app.use(cookieParser());

app.use(session({
    secret: 'jV3rj1I8nn4Ht5C6qq41',
    resave: true,
    saveUninitialized: true,
}));

app.get('/',  (req, res) => {
    res.send('Hello World!');
});

app.get('/getInfo', (req, res) => {
    const session = req.session;
    const oAuth = session.oAuth;

    const decodedAccessToken = jwt.decode(oAuth['access_token'], {complete: true});

    const pem = jwkToPem( getJwk(decodedAccessToken.header.kid),);
    jwt.verify(oAuth['access_token'], pem, { algorithms: ['RS256'] }, function(err, decodedToken) {
        if(decodedToken){
            res.send(decodedToken);
        }else{
            res.send(err);
        }
    });
});

app.use('/auth', authRoute);

app.use('/api', patientRoute)

app.listen(3030, function () {
    console.log('Example app listening on port 3030!');
});