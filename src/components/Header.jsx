import React from 'react';
import {Drawer,DrawerBody,DrawerCloseButton,DrawerContent,DrawerHeader,DrawerOverlay,
    useDisclosure,Button, VStack, Heading, Box,
} from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import {BiMenuAltLeft} from "react-icons/bi";


const Header = () => {
    const {isOpen,onClose,onOpen} = useDisclosure();
  return (
    <Box shadow={"lg"} height={"10vh"}>
    <Button onClick={onOpen}
    top={"4"}
    left={"4"}
    pos={"fixed"}
    colorScheme={"twitter"}
    borderRadius="full">
        <BiMenuAltLeft size={"25"}/>
    </Button>
    <Drawer isOpen={isOpen} placement={'left'} onClose={onClose}>
    <DrawerOverlay />
        <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>STOCKX</DrawerHeader>
            <DrawerBody>
                <VStack alignItems={"flex-start"}>
                    <Button onClick={onClose} variant={"ghost"}>
                    <Link to={"/"}>Home</Link>
                    </Button>
                    <Button onClick={onClose} variant={"ghost"}>
                    <Link to={"/coins"}>Coins</Link>
                    </Button>
                    <Button onClick={onClose} variant={"ghost"}>
                    <Link to={"/exchanges"}>Exchanges</Link>
                    </Button>
                </VStack>
            </DrawerBody>            
        </DrawerContent>
    </Drawer>
    <Heading display={"flex"} justifyContent={"center"} 
    color={"blue.600"} marginTop={"4"}>
        STOCKX
    </Heading>
   </Box>
  );
};

export default Header;