const {Router} = require('express');
const invoiceModel = require('../models/invoiceModel');
const invoiceRouter = Router();

invoiceRouter.get('/',async(req,res)=>{
    let allInvoices = await invoiceModel.find()
    res.send({msg:'All Invoices',data:allInvoices});
});

invoiceRouter.get('/year=:year&invoiceNumber=:invoiceNumber&date=:date',async(req,res)=>{
    const year = req.params.year;
    const invoiceNum = req.params.invoiceNumber;
    const date = req.params.date
    
    let allInvoices = await invoiceModel.find({year:Number(year),invoiceNumber:Number(invoiceNum),date:date})
    res.send({msg:'All Invoices',data:allInvoices})
});

invoiceRouter.post('/addinvoice',async(req,res)=>{
    const{date,invoiceNumber,amount}  = req.body;
    let year = date.split('-')[0];

    // getting all invoices having the same year.
    let filterByYear = await invoiceModel.find({year:year});

    if(filterByYear.length){ // If entry with the year exist, checking for invoice number and date in the filteredByYear array.
        
        // Checking if same invoice number or date exist.
        let filterByInvoiceNumber = filterByYear.filter((ele)=>ele.invoice===invoiceNumber || ele.date===date);
        if(filterByInvoiceNumber.length){ // If same invoice number or date exist, sending message "Invoice already exist"
            res.send({msg:"Invoice already exist, please check date or invoice number"})
        }else{ // If same invoice number or date doest not exist, checking if the date is valid.

            // Sorting the current year invoice data(filterByYear array) in ascending order in terms of invoice number.
            filterByYear.sort((a,b)=> a.invoiceNumber-b.invoiceNumber);
            let smallerThanInvoiceNum = null; //index with invoice number immediate smaller than current invoice number
            let greaterThanInvoiceNum = null; //index with invoice number immediate greater than current invoice number

            // catching index of immediate smaller and immediate greater invoice number.
            for(var a=0; a<filterByYear.length; a++){
                if(invoiceNumber > filterByYear[a].invoiceNumber){
                    smallerThanInvoiceNum = a; // catching index of immediate smaller invoice number
                }
                if(invoiceNumber < filterByYear[a].invoiceNumber){ // catching index of immediate greater invoice number and breaking it
                    greaterThanInvoiceNum = a;
                    break;
                }
            }

            // Function that returns a date format to check with the current date
            function giveDateFormat(date,diff){ 
                let expdate = new Date(date);
                expdate.setDate(date.getDate()+diff);
                let d = expdate.getDate();
                if(d<10){
                    d = "0"+d
                }
                let m = expdate.getMonth() + 1;
                if(m <10){
                    m = "0"+m
                }
                let y = expdate.getFullYear();
                let dateFormat = y + '-' + m + '-' + d;
                return dateFormat;
            }
            // If no invoice number is greater than the current invoice number
            // Checking if the current date is greater than the smallerThanInvoiceNum.
            if(greaterThanInvoiceNum===null){
                let prevDate = new Date(filterByYear[smallerThanInvoiceNum].date)
                let currentDate = new Date(date)
                
                //Checking if the difference between the current date and previous date
                let expDateDiff = invoiceNumber - filterByYear[smallerThanInvoiceNum].invoiceNumber;
                let dateFormat = giveDateFormat(prevDate,expDateDiff);
            
                if(prevDate < currentDate && dateFormat === date){
                    let invoice = new invoiceModel({date,invoiceNumber,year:year,amount});
                    await invoice.save();
                    res.send({msg:'success',data:invoice});
                }else{
                    res.send({msg:`Please enter date after ${filterByYear[smallerThanInvoiceNum].date}. Expected Date: ${dateFormat}`})
                }
            }

             // If no invoice number is smaller than the current invoice number
            // Checking if the date is smaller than the greaterThanInvoiceNum.
            else if(smallerThanInvoiceNum === null){
                let nextDate = new Date(filterByYear[greaterThanInvoiceNum].date)
                let currentDate = new Date(date);

                 //Checking if the difference between the current date and previous date
                 let expDateDiff = invoiceNumber - filterByYear[greaterThanInvoiceNum].invoiceNumber // this will be negative
                 let dateFormat = giveDateFormat(nextDate,expDateDiff);

                if(nextDate > currentDate && dateFormat === date){
                    let invoice = new invoiceModel({date,invoiceNumber,year:year,amount});
                    await invoice.save();
                    res.send({msg:'success',data:invoice});
                }else{
                    res.send({msg:`Please enter date before ${filterByYear[greaterThanInvoiceNum].date}. Expected Date: ${dateFormat}`})
                }
            }

            // Checking if the current date lies between the smaller and greater date.
            else{
                let prevDate = new Date(filterByYear[smallerThanInvoiceNum].date)
                let nextDate = new Date(filterByYear[greaterThanInvoiceNum].date);
                let currentDate = new Date(date);
                
                  //Checking if the difference between the current date and previous date
                  let expDateDiff = invoiceNumber - filterByYear[smallerThanInvoiceNum].invoiceNumber
                  let dateFormat = giveDateFormat(prevDate,expDateDiff);
                
                if(nextDate > currentDate && prevDate < currentDate && dateFormat===date){
                    let invoice = new invoiceModel({date,invoiceNumber,year:year,amount});
                    await invoice.save();
                    res.send({msg:'success',data:invoice});
                }else{
                    res.send({msg:`Please enter date between ${filterByYear[smallerThanInvoiceNum].date} to ${filterByYear[greaterThanInvoiceNum].date}. Expected date: ${dateFormat}`})
                }
            }
        }

    }
    else{ // If entry of the same year does not exist then adding it to DB
        let invoice = new invoiceModel({date,invoiceNumber,year:year,amount});
        await invoice.save();
        res.send({msg:'success',data:invoice});
    }
});

invoiceRouter.patch("/updateinvoice/:invoiceNumber",async(req,res)=>{
  let invoiceNum = Number(req.params.invoiceNumber);
  console.log(invoiceNum,typeof(invoiceNum))
  let {date,invoiceNumber,amount} = req.body;
  let updateInvoice = await invoiceModel.findOneAndUpdate({invoiceNumber:invoiceNum},{$set:{date,invoiceNumber,amount}},{new:true});
  console.log("res",updateInvoice)
  await updateInvoice.save();
  res.send({msg:"success",post:updateInvoice});
});

invoiceRouter.delete("/deleteinvoice/:invoiceNumber",async(req,res)=>{
    let invoiceNumber = req.params.invoiceNumber;
    let deleteInvoice = await invoiceModel.findOneAndDelete({invoiceNumber:invoiceNumber});
  res.send({msg:"success",invoice:deleteInvoice})
});


module.exports = invoiceRouter;