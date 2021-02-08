const mongoose = require('mongoose');
const dbConfig = require('../config/database.config');

mongoose.connect(dbConfig.url,{
    useNewUrlParser:true,
    useUnifiedTopology: true 
}).then(()=>{
    console.log("DB connected");
}).catch(err =>{
    console.log('DB connection problem - ',err);
    process.exit();
})

const userScheme = mongoose.Schema({
    name :String,
    age:Number,
    email:String
},{
    timestamps:true
});
const adminScheme = mongoose.Schema({
    name :String,
    password:String,
    token:String
},{
    timestamps:true
});

var login = mongoose.model('ADMIN',adminScheme);
var user = mongoose.model('USERS',userScheme);
module.exports = {
    login:login,
    user: user
}
