const express = require('express');
const axios = require('axios');
const tokenService = require("./jwtDecode");
const cognitoService = require("./cognito.service");
const router = express.Router();

router.post('/patientprotocol', (req, res) => {
    console.log(req.body);

    tokenService.getAccessToken(req.session).then(token => {
        axios.post(`${process.env.RESOURCE_SERVER}/patient/protocol`, {
            userId: req.body.userId,
            description: req.body.description
        }, {
            withCredentials: true,
            headers: {
                'aws-token': token.encodedToken
            }
        }).then(body => {
            console.log(body);
            res.send(200, 'ok');
        });
    });
});

router.get('/patientprotocol', (req, res) => {
    tokenService.getAccessToken(req.session).then(token => {
        let options = {
            params: {userId: req.query.userId},
            headers: {
                'aws-token': token.encodedToken
            }
        };

        const userProtocols = axios.get(`${process.env.RESOURCE_SERVER}/patient/protocol`, options);
        const getUser = cognitoService.getUser(req.query.userId);
        Promise.all([getUser, userProtocols]).then(([user, protocols]) => {
            res.send(protocols.data.map(protocol => {
                return {
                    username: `${user.UserAttributes.find(item => item.Name === 'name').Value} ${user.UserAttributes.find(item => item.Name === 'family_name').Value}`,
                    date: protocol.visitDate,
                    description: protocol.description
                }
            }))

        });
    });
});

router.get('/allprotocoll', (req, res) => {
    cognitoService.listUsers().then(data => res.send(data));
});

router.get('/allPatient', (req, res) => {
    cognitoService.listPatients().then(data => {
        let listPatients = [];
        data.Users.forEach(patient => {
            let patientObj = {};
            patientObj.userId = patient.Username;
            patient.Attributes.forEach(attr => {
                if (attr.Name === 'name') {
                    patientObj.name = attr.Value;
                }
                if (attr.Name === 'family_name') {
                    patientObj.family_name = attr.Value;
                }
            });
            listPatients.push(patientObj);
        });
        res.send(listPatients);
    });
})

module.exports = router;
