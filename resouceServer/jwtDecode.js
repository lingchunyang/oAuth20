const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const {getJwk} = require("./jwks");

const headerName = 'aws-token';

const tokenService ={
    getUtcDateNow: () => {
        const date = new Date();
        return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
            date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()));
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
    getAccessToken: ( headers) => {
        return new Promise((resolve, reject) => {
            let token = tokenService.jwtDecode(headers[headerName]);
            if (token) {
                resolve(token);
                return;
            }
            reject();
        });
    },
    tokenGuard: (req, res, next) => {
        const headers = req.headers;
        const token = tokenService.jwtDecode(headers[headerName]);
        if(token){
            return next();
        }
        return res.status(500).send({ error: 'Token is not valid!' });
    },
    doctorGuard: (req, res, next) => {
        const headers = req.headers;

        const token = tokenService.jwtDecode(headers[headerName]);

        if(token && token['cognito:groups'].includes('Doctor')){
            return next();
        }
        return res.status(500).send({ error: 'Token is not valid!' });
    }
};
module.exports = tokenService;