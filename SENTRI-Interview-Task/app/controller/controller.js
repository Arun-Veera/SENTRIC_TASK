const Model = require('../models/model');
const middleWare = require('../middleware/jwt.auth');

exports.login = (req, res) => {
    if (req.body.name == 'Admin' && req.body.password == 'password') {
        middleWare.checkUserAndjwtSign(req.body.name, token => {
            const model = new Model.login({
                name: req.body.name,
                password: req.body.password,
                token: token.accessToken
            })
            model.save().then(data => {
                console.log("Login = ", data);
                res.send(token);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Error in save data"
                })
            })
        })
    } else {
        res.send('Username or password incorrect');
    }
}



exports.create = (req, res) => {
    const authKey = req.headers.authorization;
    middleWare.verifyJWTToken(authKey, valid => {
        if (valid.username == 'Admin') {
            if (!req.body) {
                return res.status(400).send({
                    message: "Request body is empty"
                });
            }
            const model = new Model.user({
                name: req.body.name,
                age: req.body.age,
                email: req.body.email
            });
            model.save().then(data => {
                console.log("data === >", data);
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Error in save data"
                })
            })
        } else {
            res.status(403).send({
                message: "Forbidden"
            })
        }
    })
};

exports.findOne = (req, res) => {
    const authKey = req.headers.authorization;
    middleWare.verifyJWTToken(authKey, valid => {
        if (valid.username == 'Admin') {
            Model.user.findOne(req.body.filter).then(resData => {
                if (!resData) {
                    return res.status(404).send({
                        message: "Note not found with id " + JSON.stringify(req.body.filter)
                    });
                }
                res.send(resData);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Error in retrieving data"
                });
            })

        } else {
            res.status(403).send({
                message: "Forbidden"
            })
        }
    })

};

exports.update = (req, res) => {
    const authKey = req.headers.authorization;
    middleWare.verifyJWTToken(authKey, valid => {
        if (valid.username == 'Admin') {
            Model.user.findOneAndUpdate(req.body.filter, {
                name: req.body.name,
                age: req.body.age,
                email: req.body.email
            }, { new: true }).then(resData => {
                if (!resData) {
                    return res.status(404).send({
                        message: "Requested data not found" + JSON.stringify(req.body.filter)
                    });
                }
                res.send(resData);
            }).catch(err => {
                return res.status(500).send({
                    message: "error in updating data" + err
                });
            })
        } else {
            res.status(403).send({
                message: "Forbidden"
            })
        }
    })
    if (!req.body) {
        return res.status(400).send({
            message: "Body is empty"
        });
    }

};

exports.delete = (req, res) => {
    const authKey = req.headers.authorization;
    middleWare.verifyJWTToken(authKey, valid => {
        if (valid.username == 'Admin') {
            Model.user.findOneAndDelete(req.body.filter).then(resData => {
                if (!resData) {
                    return res.status(404).send({
                        message: "Requested data not found" + JSON.stringify(req.body.filter)
                    });
                }
                res.send({ message: "Data deleted successfully" });
            }).catch(err => {
                return res.status(500).send({
                    message: "Error in deleting data " + err
                });
            })
        } else {
            res.status(403).send({
                message: "Forbidden"
            })
        }
    });

};