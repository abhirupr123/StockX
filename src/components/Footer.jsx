import React from 'react';
import { Box, VStack, Text, Button, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return(
        <Box bgColor={"blackAlpha.900"} color={"whiteAlpha.700"}
        minH={48} px={16} py={["16","8"]}>
        <VStack w={"full"} alignItems={["center","flex-start"]}>
            <Text fontWeight={"bold"}>About Us</Text>
            <Text fontSize={"sm"} letterSpacing={"widest"} textAlign={["center","left"]}>
            StockX is the onestop destination for all Stock Market and Cryptocurrency updates by tracking real time data.</Text>            
        </VStack>
        <HStack p={"4"} marginLeft={["-2","-4"]}>
            <Button variant={"link"} color={"whiteAlpha.700"}>
            <Link to={"/"}>Home</Link>
            </Button>
            <Button variant={"link"} color={"whiteAlpha.700"}>
            <Link to={"/coins"}>Coins</Link>
            </Button>
            <Button variant={"link"} color={"whiteAlpha.700"}>
            <Link to={"/exchanges"}>Exchanges</Link>
            </Button>
        </HStack>
        <Text color={"whiteAlpha.700"} marginLeft={["1.5","-0.5"]}>&copy; Copyright StockX 2022</Text>
        </Box>
    );
};

export default Footer;