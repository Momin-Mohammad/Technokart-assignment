import './App.css';
import { Box, Grid, GridItem, Heading, Text, useToast } from '@chakra-ui/react';
import InvoiceFormComp from './components/invoiceFormComp';
import InvoiceComp from './components/invoiceComp';
import { useEffect, useState } from 'react';
import { DBurl } from './utils';
import axios from 'axios';
import FilterComp from './components/filterComp';
import LoadingComp from './components/loadingComp';
import NoDataComp from './components/noDataComp';

function App() {
  const toast = useToast();
  const[invoiceData ,setInvoiceData] = useState([]);
  const[filteredData, setFilteredData] = useState([]);
  const[toUpdate,setToUpdate] = useState('');
  const[loading,setLoading] = useState(false);

  const deleteInvoice=(id)=>{
    axios.delete(`${DBurl}/deleteinvoice/${id}`)
    .then(res=>
      {
        let invoices = invoiceData.filter((ele)=>ele._id!==id);
        setInvoiceData(invoices);
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

const updateInvoice=(id)=>{
  setToUpdate(id); // Using the id to update an invoice using the same form
  window.scrollTo(0,0);
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

  // Function to check whether invoice data based on the filtered is present or not.
  function checkFilterResult(length,filteredInvoice){
    if(!length){
      toast({
        title: 'Invoice with the filter is not present',
        description: 'Showing all invoice data',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      setFilteredData([]);
    }else{
      setFilteredData(filteredInvoice);
    }
  }

  if(!date && !year){
  let filteredInvoice = invoiceData?.filter((ele)=>ele.invoiceNumber==number);
  checkFilterResult(filteredInvoice.length,filteredInvoice);
  }else if(!date && !number){
    let filteredInvoice = invoiceData?.filter((ele)=>ele.year==year);
    checkFilterResult(filteredInvoice.length,filteredInvoice);
    }else if(!year && !number){
      let filteredInvoice = invoiceData?.filter((ele)=>ele.date==date);
      checkFilterResult(filteredInvoice.length,filteredInvoice);
      }else if(!year){
        let filteredInvoice = invoiceData?.filter((ele)=>ele.date==date && ele.invoiceNumber==number);
        checkFilterResult(filteredInvoice.length,filteredInvoice);
        }else if(!number){
          let filteredInvoice = invoiceData?.filter((ele)=>ele.date==date && ele.year==year);
          checkFilterResult(filteredInvoice.length,filteredInvoice);
          }else if(!date){
            let filteredInvoice = invoiceData?.filter((ele)=>ele.invoiceNumber==number && ele.year==year);
            checkFilterResult(filteredInvoice.length,filteredInvoice);
            }
  
   
}

  useEffect(()=>{
    setLoading(true);
    axios.get(DBurl).then(res=>{
      setInvoiceData(res.data.data);
      setLoading(false);
    })
    .catch(err=>{
      console.log(err);
      toast({
        title: 'Error occured while fetching data',
        description: "Please check internet connection or check the console.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    })
  },[])

  return (
    <Box className='App'>

      {/* Form to add or update invoice */}
      <InvoiceFormComp 
      setToUpdate={setToUpdate} 
      toUpdateID={toUpdate} 
      invoiceData={invoiceData}
      setInvoiceData={setInvoiceData} />

      <Heading w={{base:'50%',sm:'50%',md:'30%',lg:'20%'}} 
      border={'3px solid white'} 
      borderBottom={'0px'}
      fontSize={'larger'}
      p={3}
      margin={'auto'}
      marginTop={"4%"}> Invoices </Heading>

      {/* Filter component */}
      <FilterComp filterInvoice={filterInvoice} />
  {
    loading?<LoadingComp />
    :
        <Grid 
        p={3}
        templateColumns={{sm:'repeat(2,1fr)',md:'repeat(3,1fr)',lg:'repeat(4,1fr)'}} 
        gap={5}>

    {/* If filtered data is present, displaying that or else displaying all invoice data */}
        { 
        filteredData.length? 
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
        invoiceData.lenth? invoiceData?.map((ele)=>
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
        <NoDataComp />
        }
        </Grid>
}
    </Box>
  );
}

export default App;
