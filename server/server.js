//server running through
const express=require('express');
const app=express();
const mysql=require('mysql');
const cors=require('cors');

app.use(cors());
app.use(express.json());



const database=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'demo'
});


app.get("/getall",(req,res)=>{
    database.query("select * from demo",(err,result)=>{
        res.send(result);     
    });
})
app.listen(3010,()=>{
    console.log("port:3010");
});

