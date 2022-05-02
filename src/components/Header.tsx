import React from 'react';
import { Flex, Image } from '@chakra-ui/react';
import logo from '../images/linacess_logo.png';

function Header() {
    return (
        <Flex
            p="1rem 1.5rem"
            justifyContent="flex-start"
            alignItems="flex-start"
            w="100%"
            h="80px"
            boxShadow="xs"
            background="#ffffff"
        >
            <Image w="6rem" src={logo} alt="Logo" />
        </Flex>
    );
}

export default Header;
