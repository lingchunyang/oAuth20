const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const tokenService = require("./jwtDecode");
const router = express.Router();


router.get('/login', (req, res) => {
    res.send({redirectUrl: `${process.env.COGNITO_URL}/login?response_type=code&client_id=${process.env.COGNITO_CLIENTID}&redirect_uri=${process.env.COGNITO_REDIRECT_URL}`});
});

router.get('/isLoggedIn', (req, res) => {
    tokenService.getAccessToken(req.session).then(() => {
        res.send(true);
    }, () => {
        res.send(false);
    });
});

router.get('/callback', (req, res) => {
    const session = req.session;
    session.oauthCode = req.query.code;

    const options = {
        auth: {
            username: process.env.COGNITO_CLIENTID,
            password: process.env.COGNITO_CLIENT_SECRET
        },
        headers: {'content-type': 'application/x-www-form-urlencoded'}
    };
    console.log('callback post')

    axios.post(`${process.env.COGNITO_URL}/oauth2/token`, querystring.stringify({
        grant_type: 'authorization_code',
        client_id: process.env.COGNITO_CLIENTID,
        redirect_uri: process.env.COGNITO_REDIRECT_URL,
        code: session.oauthCode
    }), options).then(response => {
        session.oAuth = response.data;
        res.redirect(301, `${process.env.COGNITO_URL}/doctor-view`);
    }   );
});

module.exports = router;

