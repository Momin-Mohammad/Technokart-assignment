import { Box, Button, Text } from "@chakra-ui/react";
import axios from "axios";
import { DBurl } from "../utils";

export default function InvoiceComp({id,date,number,amount,deleteInvoice,updateInvoice}){

    return(
        <Box fontSize={"large"}>
            <Text>Date : {date}</Text>
            <Text margin={'2% 0%'}>Invoice number : {number}</Text>
            <Text>Amount : ₹{amount}</Text>
            <Box display={"flex"} 
            justifyContent={"center"} 
            margin={"5% 0%"}
            gap={2}>
                <Button backgroundColor={"gray"} onClick={()=>updateInvoice(id)}>Update</Button>
                <Button backgroundColor={"gray"} onClick={()=>deleteInvoice(id)} >Delete</Button>
            </Box>
        </Box>
    )
}