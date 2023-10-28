import { Box, Button, Input, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { DBurl } from "../utils";

export default function FilterComp({filterInvoice}){
    const toast = useToast();
    const[date,setDate] = useState('');
    const[number,setNumber]  = useState('');
    const[year,setYear] = useState('');

    return(
        <Box p={'3% 0%'}
        borderTop={'3px solid white'}
        borderBottom={'3px solid white'}
        >
            <form 
            onSubmit={(e)=>filterInvoice({e,year,date,number})}>
                <Input
                w={'auto'}
                p={'2%'} value={date} 
                onChange={(e)=>setDate(e.target.value)} type='date' placeholder='Enter Date'/>

                <Input
                w={'auto'}
                p={'2%'} 
                margin={"0% 2%"}
                value={number} 
                onChange={(e)=>setNumber(e.target.value)} type='number' placeholder='Invoice Number'/>

                <Input 
                w={'auto'}
                p={'2%'} value={year} 
                onChange={(e)=>setYear(e.target.value)} type='number' placeholder='Enter year'/>
                <Button 
                disabled={true}
                w={'auto'} margin={"0% 2%"} type='submit'>Apply filter</Button>
            </form>
        </Box>
    )
}