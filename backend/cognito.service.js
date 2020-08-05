const AWS = require('aws-sdk');

const cognitoService = {
    listUsers: () => {
        var params = {
            UserPoolId: `${process.env.COGNITO_USERPOOL_ID}`,
            AttributesToGet: [
                'email',
                'name',
                'family_name'
            ],
        };

        return new Promise((resolve, reject) => {
            AWS.config.update({
                region: `${process.env.COGNITO_REGION}`,
                'accessKeyId': `${process.env.COGNITO_ACCESS_KEY_ID}`,
                'secretAccessKey': `${process.env.COGNITO_SECRET_ACCESS_KEY}`
            });
            var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
            cognitoidentityserviceprovider.listUsers(params, (err, data) => {
                if (err) {
                    console.log(err);
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        });
    },
    listPatients: () => {
        var params = {
            GroupName: 'Patient', /* required */
            UserPoolId: `${process.env.COGNITO_USERPOOL_ID}`, /* required */
          };

          return new Promise((resolve, reject) => {
            AWS.config.update({
                region: `${process.env.COGNITO_REGION}`,
                'accessKeyId': `${process.env.COGNITO_ACCESS_KEY_ID}`,
                'secretAccessKey': `${process.env.COGNITO_SECRET_ACCESS_KEY}`
            });
            var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
            cognitoidentityserviceprovider.listUsersInGroup(params, (err, data) => {
                if (err) {
                    console.log(err);
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        });
          
    },

    getUser: (userId) => {
        var params = {
            UserPoolId: `${process.env.COGNITO_USERPOOL_ID}`,
            Username: userId
        };
        return new Promise((resolve, reject) => {
            AWS.config.update({
                region: `${process.env.COGNITO_REGION}`,
                'accessKeyId': `${process.env.COGNITO_ACCESS_KEY_ID}`,
                'secretAccessKey': `${process.env.COGNITO_SECRET_ACCESS_KEY}`
            });
            var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
            cognitoidentityserviceprovider.adminGetUser(params, (err, data) => {
                if (err) {
                    console.log(err);
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        });

    }
}

module.exports = cognitoService;