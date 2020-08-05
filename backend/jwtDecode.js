const jwt = require('jsonwebtoken');
const axios = require('axios');
const querystring = require('querystring');

const jwkToPem = require('jwk-to-pem');
const {getJwk} = require("./jwks");

const tokenService = {
    getUtcDateNow: () => {
        const date = new Date();
        return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
            date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()));
    },
    refreshToken: (refreshToken) => {
        return new Promise((resolve, _) => {
            const options = {
                auth: {
                    username: process.env.COGNITO_CLIENTID,
                    password: process.env.COGNITO_CLIENT_SECRET
                },
                headers: {'content-type': 'application/x-www-form-urlencoded'}
            };

            axios.post(`${process.env.COGNITO_URL}/oauth2/token`, querystring.stringify({
                grant_type: 'refresh_token',
                client_id: process.env.COGNITO_CLIENTID,
                refresh_token: refreshToken

            }), options).then(body => {
                resolve(body);
            });
        });
    },
    jwtDecode: (token) => {
        const decodedAccessToken = jwt.decode(token, {complete: true});

        const pem = jwkToPem(getJwk(decodedAccessToken.header.kid),);

        const verifiedToken = jwt.verify(token, pem, {algorithms: ['RS256']});

        if (tokenService.getUtcDateNow() > new Date(verifiedToken.exp * 1000)) {
            return false;
        }

        return verifiedToken;
    },
    getAccessToken: (session) => {
        return new Promise((resolve, _) => {
            let token = tokenService.jwtDecode(session.oAuth['access_token']);
            if (token) {
                resolve({token, encodedToken: session.oAuth['access_token']});
                return;
            }
            tokenService.refreshToken(session.oAuth['refrest_token']).then((() => {
                token = tokenService.jwtDecode(session.oAuth['access_token']);
                resolve(token)
            }))
        });
    }
};
module.exports = tokenService;