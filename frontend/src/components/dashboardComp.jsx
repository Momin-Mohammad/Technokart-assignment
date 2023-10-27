import { Box, Heading, Input } from "@chakra-ui/react";
import { useState } from "react";

export default function DashboardComp(){
    const[date,setDate] = useState('');
    const[number,setNumber]  = useState('');
    const[amount,setAmount] = useState('');

    const generateInvoice =(e)=>{
        e.preventDefault();
        let invoiceData = {
            date : date,
            invoiceNumber : number,
            amount : amount
        }
        console.log(invoiceData);
    }
    return(
        <Box w={'60%'} margin={'auto'}>
            <Heading margin={"2% 0%"}>Invoice Form</Heading>
            <form onSubmit={generateInvoice}>
                <Input p={'2%'} fontSize={"larger"} margin={"2% 0%"} value={date} onChange={(e)=>setDate(e.target.value)} required type='date' placeholder='Enter Date'/>
                <Input p={'2%'} fontSize={"larger"} margin={"2% 0%"} value={number} onChange={(e)=>setNumber(e.target.value)} required type='text' placeholder='Invoice Number'/>
                <Input p={'2%'} fontSize={"larger"} margin={"2% 0%"} value={amount} onChange={(e)=>setAmount(e.target.value)} required type='number' placeholder='Enter Amount'/>
                <Input fontWeight={'bold'} fontSize={"larger"} margin={"2% 0%"} type='submit' value='SUBMIT'/>
            </form>
        </Box>
    )
}