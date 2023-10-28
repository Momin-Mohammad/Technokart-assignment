import './App.css';
import { Box, Grid, GridItem, Heading, useToast } from '@chakra-ui/react';
import InvoiceFormComp from './components/invoiceFormComp';
import InvoiceComp from './components/invoiceComp';
import { useEffect, useState } from 'react';
import { DBurl } from './utils';
import axios from 'axios';
import FilterComp from './components/filterComp';

function App() {
  const toast = useToast();
  const[invoiceData ,setInvoiceData] = useState([]);
  const[filteredData, setFilteredData] = useState([]);
  const[toUpdate,setToUpdate] = useState('')

  const deleteInvoice=(id)=>{
    axios.delete(`${DBurl}/deleteinvoice/${id}`)
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

const updateInvoice=(id)=>{
  setToUpdate(id);
}

const filterInvoice=({e,date,year,number})=>{
  e.preventDefault();
  if(!year && !date && !number){
    toast({
      title: 'Please enter atleast one filter parameter',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }
  if(!date && !year){
  let filteredInvoice = invoiceData?.filter((ele)=>ele.invoiceNumber==number);
  setFilteredData(filteredInvoice);
  }else if(!date && !number){
    let filteredInvoice = invoiceData?.filter((ele)=>ele.year==year);
    setFilteredData(filteredInvoice);
    }else if(!year && !number){
      let filteredInvoice = invoiceData?.filter((ele)=>ele.date==date);
      setFilteredData(filteredInvoice);
      }else if(!year){
        let filteredInvoice = invoiceData?.filter((ele)=>ele.date==date && ele.invoiceNumber==number);
        setFilteredData(filteredInvoice);
        }else if(!number){
          let filteredInvoice = invoiceData?.filter((ele)=>ele.date==date && ele.year==year);
          setFilteredData(filteredInvoice);
          }else if(!date){
            let filteredInvoice = invoiceData?.filter((ele)=>ele.invoiceNumber==number && ele.year==year);
            setFilteredData(filteredInvoice);
            }
  
   
}

  useEffect(()=>{
    axios.get(DBurl).then(res=>setInvoiceData(res.data.data))
    .catch(err=>{
      console.log(err);
      toast({
        title: 'Error occured while fetching data',
        description: "Please check console",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    })
  },[invoiceData])

  return (
    <Box className="App">
      <InvoiceFormComp setToUpdate={setToUpdate} toUpdateID={toUpdate} />
      <Heading w={'fit-content'} 
      border={'3px solid white'} 
      borderBottom={'0px'}
      p={3}
      margin={'auto'}
      marginTop={"2%"}>- * - * - Invoices - * - * -</Heading>
      <FilterComp filterInvoice={filterInvoice} />
        <Grid 
        p={3}
        templateColumns={'repeat(4,1fr)'} 
        gap={5}>
        { filteredData.length? 
        filteredData?.map((ele)=>
        <GridItem backgroundColor={"black"} 
        borderRadius={"10px"}
        p={5} w={'100%'} 
        key={ele._id}>
          <InvoiceComp id={ele._id}
           date={ele.date} 
           number={ele.invoiceNumber} 
           amount={ele.amount}
           deleteInvoice={deleteInvoice}
           updateInvoice={updateInvoice} />
        </GridItem>
        ) 
        :
        invoiceData?.map((ele)=>
        <GridItem backgroundColor={"black"} 
        borderRadius={"10px"}
        p={5} w={'100%'} 
        key={ele._id}>
          <InvoiceComp id={ele._id}
           date={ele.date} 
           number={ele.invoiceNumber} 
           amount={ele.amount}
           deleteInvoice={deleteInvoice}
           updateInvoice={updateInvoice} />
        </GridItem>
        )
        }
        </Grid>
    
    </Box>
  );
}

export default App;
