import { Box, Grid, GridItem, Skeleton, Stack } from "@chakra-ui/react";

export default function LoadingComp(){
    return(
        <Grid 
        p={3}
        templateColumns={{sm:'repeat(2,1fr)',md:'repeat(3,1fr)',lg:'repeat(4,1fr)'}} 
        gap={5}>

        <GridItem borderRadius={"10px"}>
        <Skeleton h={'200px'} />
        </GridItem>

        <GridItem borderRadius={"10px"}>
        <Skeleton h={'200px'} />
        </GridItem>

        <GridItem borderRadius={"10px"}>
        <Skeleton h={'200px'} />
        </GridItem>

        <GridItem borderRadius={"10px"}>
        <Skeleton h={'200px'} />
        </GridItem>

  </Grid>
    )
}