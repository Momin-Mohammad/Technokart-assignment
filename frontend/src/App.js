import './App.css';
import { Box, Grid, GridItem, Heading } from '@chakra-ui/react';
import InvoiceFormComp from './components/invoiceFormComp';
import InvoiceComp from './components/invoiceComp';
import { useEffect, useState } from 'react';
import { DBurl } from './utils';
import axios from 'axios';

function App() {
  const[invoiceData ,setInvoiceData] = useState([]);

  useEffect(()=>{
    axios.get(DBurl).then(res=>setInvoiceData(res.data.data)).catch(err=>console.log(err))
  },[])

  return (
    <Box className="App">
      <InvoiceFormComp />
      <Heading margin={"2% 0%"}>Invoices</Heading>
        <Grid w={"60%"} 
        margin={"auto"} 
        templateColumns={'repeat(4,1fr)'} 
        gap={5}>
        {
        invoiceData?.map((ele)=>
        <GridItem backgroundColor={"black"} 
        borderRadius={"10px"}
        p={5} w={'100%'} 
        key={ele._id}>
          <InvoiceComp date={ele.date} number={ele.invoiceNumber} amount={ele.amount} />
        </GridItem>
        )
        }
        </Grid>
    
    </Box>
  );
}

export default App;
