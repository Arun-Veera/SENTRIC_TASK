const express = require('express');
const bodyParser = require('body-parser');

const app = express();
let port = 4321;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/', (req, res) =>{
    res.json({"Name":"ArunVeera"})
});

require('./app/routes/router')(app);


app.listen(port,()=>{
    console.log("Express is started and running in the port " +port);
});