const express = require('express');
const cors = require('cors');
const connection = require('./configs/db');
const invoiceRouter = require('./routes/invoiceRoute');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({origin:'*'}));
app.use('/invoice',invoiceRouter);

app.get("/",(req,res)=>{
    res.send({msg:'Working'});
})

app.listen(process.env.port,async()=>{
    try{
        connection;
        console.log(`Connected to port ${process.env.port}`)
    }catch(error){
        console.log('Error:',error)
    }
})