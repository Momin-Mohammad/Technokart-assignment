import { Box, Button, Heading, Input, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { DBurl } from "../utils";
import axios from "axios";

export default function InvoiceFormComp({toUpdateID,setToUpdate,invoiceData,setInvoiceData}){
    const toast = useToast();
    const[date,setDate] = useState('');
    const[number,setNumber]  = useState('');
    const[amount,setAmount] = useState('');

    useEffect(()=>{
        // Using same form to Add new invoice and updating an invoice
        if(toUpdateID){ // If toUpdateID(id of particular invoice) is present, using the form to update the invoice
            axios.get(`${DBurl}/${toUpdateID}`)
            .then(res=>{
                setDate(res.data.data[0]?.date);
                setNumber(res.data.data[0]?.invoiceNumber);
                setAmount(res.data.data[0]?.amount)
            })
            .catch(err=>
                {
                console.log("Error:",err);
                toast({
                    title: 'Error occured while adding invoice',
                    description: "Please check console",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                  })
                })

        }
    },[toUpdateID])

    const generateInvoice =(e)=>{
        e.preventDefault();
       
        let invoiceDetails = {
            date : date,
            invoiceNumber : number,
            amount : amount
        }

        if(toUpdateID){// If toUpdateID(id of particular invoice) is present, using the form to update the invoice
            axios.patch(`${DBurl}/updateinvoice/${toUpdateID}`,invoiceDetails)
        .then(res=>
           { 
            if(res.data.msg==="Invoice updated"){
                let updatedInvoice = 
              invoiceData.map((ele)=>
              ele._id === toUpdateID?
              {...ele,date:invoiceDetails.date,invoiceNumber:invoiceDetails.invoiceNumber,amount:invoiceDetails.amount}
              :
              ele
              )
              console.log(updatedInvoice)
              setInvoiceData(updatedInvoice);
            }
            toast({
                title: res.data.msg,
                status: 'success',
                duration: 5000,
                isClosable: true,
              })

              setToUpdate('');
            }
            )
        .catch(err=>
            {console.log("Error:",err);
            toast({
                title: 'Error occured while updating invoice',
                description: "Please check console",
                status: 'success',
                duration: 5000,
                isClosable: true,
              })}
            )
        }
        else{ // If toUpdateID(id of particular invoice) is not present, using the form to add a new invoice
        axios.post(`${DBurl}/addinvoice`,invoiceDetails)
        .then(res=>
           { 
            if(res.data.msg === 'Invoice Added'){
                setInvoiceData([...invoiceData,invoiceDetails]);
            } 
            toast({
                title: res.data.msg,
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
            }
            )
        .catch(err=>
            {console.log("Error:",err);
            toast({
                title: 'Error occured while adding invoice',
                description: "Please check console",
                status: 'success',
                duration: 5000,
                isClosable: true,
              })}
            )
        }
        setDate('');
        setNumber('');
        setAmount('');
    }
    return(
        <Box 
        p={3}
        border={'1px solid gray'}
        borderRadius={'10px'}
        w={{base:'75%',sm:'85%',md:'70%',lg:'60%'}}
        backgroundColor={""}
        margin={'auto'}>
            <Heading fontSize={'larger'} margin={"0% 0% 2% 0%"}>Invoice Form</Heading>
            <form onSubmit={generateInvoice}>
                <Input required 
                color={"whitesmoke"}
                p={'2%'} fontSize={"larger"} margin={"1% 0%"} value={date} 
                onChange={(e)=>setDate(e.target.value)} type='date' placeholder='Enter Date'/>

                <Input required 
                p={'2%'} fontSize={"larger"} margin={"1% 0%"} value={number} 
                onChange={(e)=>setNumber(e.target.value)} type='text' placeholder='Invoice Number'/>

                <Input required 
                p={'2%'} fontSize={"larger"} margin={"1% 0%"} value={amount} 
                onChange={(e)=>setAmount(e.target.value)} type='number' placeholder='Enter Amount'/>
                <Button fontWeight={'bold'} fontSize={"larger"} w={"50%"} margin={"2% 0%"} type='submit'>{toUpdateID?'Update Invoice':'Add Invoice'}</Button>
            </form>
        </Box>
    )
}