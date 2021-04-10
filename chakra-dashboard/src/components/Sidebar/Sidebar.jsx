import React, { useRef, useEffect, useState } from 'react';

import { RegisterForm } from "./registerForm";
import { DividerWithText } from "./dividerWithText";

import { Box, Button, VisuallyHidden, SimpleGrid, useColorModeValue as mode, } from '@chakra-ui/react';

import FilterForm from "./FilterForm";

const Sidebar = ({ filters, setFilters }) => {

    useEffect(() => {

    }, []);

    return (
        <div>
            <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} mt="8" w={{ sm: 'full' }}>
                <Box
                    bg={mode('white', 'gray.700')}
                    py="8"
                    px={{ base: '4', md: '10' }}
                    shadow="base"
                    rounded={{ sm: 'lg' }}
                >
                    hello
                    {/* <RegisterForm />
                    <DividerWithText mt="6">or continue with</DividerWithText>
                    <SimpleGrid mt="6" columns={1} spacing="3">
                        <Button color="currentColor" variant="outline">
                            <VisuallyHidden>Sign up with Google</VisuallyHidden>
                        </Button>
                    </SimpleGrid> */}
                </Box>
            </Box>
        </div>
    );
};

export default Sidebar;
