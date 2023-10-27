import { Box, Button, Text } from "@chakra-ui/react";

export default function InvoiceComp({date,number,amount}){
    return(
        <Box>
            <Text>Date : {date}</Text>
            <Text>Invoice number : {number}</Text>
            <Text>Amount : ₹{amount}</Text>
            <Box display={"flex"} 
            justifyContent={"center"} 
            margin={"5% 0%"}
            gap={2}>
                <Button>Update</Button>
                <Button>Delete</Button>
            </Box>
        </Box>
    )
}