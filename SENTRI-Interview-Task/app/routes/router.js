
module.exports =(app) =>{
    const controller = require('../controller/controller');
    
    app.post('/login', controller.login)

    app.post('/createUser', controller.create);

    app.post('/readUser',controller.findOne);

    app.post('/updateUser',controller.update);

    app.post('/deleteUser',controller.delete);
}