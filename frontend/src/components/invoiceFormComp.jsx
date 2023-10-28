import { Box, Button, Heading, Input, useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { DBurl } from "../utils";
import axios from "axios";

export default function InvoiceFormComp({toUpdateID,setToUpdate}){
    const toast = useToast();
    const[date,setDate] = useState('');
    const[number,setNumber]  = useState('');
    const[amount,setAmount] = useState('');

    useEffect(()=>{
        console.log(toUpdateID)
        if(toUpdateID){
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
       
        let invoiceData = {
            date : date,
            invoiceNumber : number,
            amount : amount
        }

        if(toUpdateID){
            console.log('Inside',toUpdateID)
            axios.patch(`${DBurl}/updateinvoice/${toUpdateID}`,invoiceData)
        .then(res=>
           { 
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
        else{
        axios.post(`${DBurl}/addinvoice`,invoiceData)
        .then(res=>
            toast({
                title: res.data.msg,
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
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
        <Box w={'60%'} margin={'auto'}>
            <Heading margin={"2% 0%"}>Invoice Form</Heading>
            <form onSubmit={generateInvoice}>
                <Input required 
                p={'2%'} fontSize={"larger"} margin={"1% 0%"} value={date} 
                onChange={(e)=>setDate(e.target.value)} type='date' placeholder='Enter Date'/>

                <Input required 
                p={'2%'} fontSize={"larger"} margin={"1% 0%"} value={number} 
                onChange={(e)=>setNumber(e.target.value)} type='text' placeholder='Invoice Number'/>

                <Input required 
                p={'2%'} fontSize={"larger"} margin={"1% 0%"} value={amount} 
                onChange={(e)=>setAmount(e.target.value)} type='number' placeholder='Enter Amount'/>
                <Button fontWeight={'bold'} fontSize={"larger"} w={"50%"} margin={"2% 0%"} type='submit'>SUBMIT</Button>
            </form>
        </Box>
    )
}