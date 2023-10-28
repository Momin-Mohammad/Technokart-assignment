import { Box, Button, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";

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
                w={{sm:'70%',md:'50%',lg:'auto'}}
                p={'2%'} value={date} 
                onChange={(e)=>setDate(e.target.value)} type='date' placeholder='Enter Date'/>

                <Input
                w={{sm:'70%',md:'50%',lg:'auto'}}
                p={'2%'} 
                margin={"0% 2%"}
                value={number} 
                onChange={(e)=>setNumber(e.target.value)} type='number' placeholder='Invoice Number'/>

                <Input 
                w={{sm:'70%',md:'50%',lg:'auto'}}
                p={'2%'} value={year} 
                onChange={(e)=>setYear(e.target.value)} type='number' placeholder='Enter year'/>

                <Button 
                w={{sm:'70%',md:'50%',lg:'auto'}} margin={"0% 2%"} type='submit'>Apply filter</Button>
            </form>
        </Box>
    )
}