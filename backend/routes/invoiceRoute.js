const {Router} = require('express');
const invoiceModel = require('../models/invoiceModel');
const invoiceRouter = Router();

invoiceRouter.get('/',async(req,res)=>{
    let allInvoices = await invoiceModel.find()
    res.send({msg:'All Invoices',data:allInvoices})
});

invoiceRouter.post('/addinvoice',async(req,res)=>{
    const{date,invoiceNumber,amount}  = req.body;
    let year = date.split('-')[0];
    let allInvoices = new invoiceModel({date,invoiceNumber,year:year,amount});
    await allInvoices.save();
    res.send({msg:'All Invoices',data:allInvoices});
});


module.exports = invoiceRouter;