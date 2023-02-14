const express = require("express");
const expbars = require("express-handlebars");
const bodyparser = require("body-parser");
const mysql= require("mysql") ; 

require('dotenv').config(); 

const app = express();
const port = process.env.PORT || 5050


app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());


app.use(express.static("public"));

const handlebars = expbars.create({extname:".hbs"})
app.engine('hbs', handlebars.engine );
app.set("view engine", "hbs");



/*const con=mysql.createPool({
    connectionLimit:10,
    host:process.env.host1,
    user:process.env.user1,
    password: process.env.pass,
    database:process.env.dbname
});

con.getConnection((err,connection)=>{
    if(err) throw err
    console.log("connection success");
});


/*app.get('/',(req,res)=>{

    res.render("home");

});*/

const routes=require("./server/routes/styd");
app.use('/',routes);

app.listen(port,()=>{
    console.log("Listening post:" +port)
; })