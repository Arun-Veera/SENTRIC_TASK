const jwt = require('jsonwebtoken')
const configKey = require('./auth.config');

exports.checkUserAndJWTSign = (name, res) => {
    const accessToken = jwt.sign({ username: name }, configKey.accessToken);
    res({
        accessToken
    })
}

exports.verifyJWTToken = (authHeader , res) => {
    if (authHeader) {
        jwt.verify(authHeader, configKey.accessToken, (err, user) => {
            if (err) {
                res(err);
            }
            res(user);
        });
    } else {
        res(`Error in ${authHeader}`);
    }
}