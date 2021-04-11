import React, { useRef, useEffect, useState } from 'react';
import './sidebar-style.css';
import { RegisterForm } from './registerForm';
import { DividerWithText } from './dividerWithText';

import {
  Box,
  Button,
  VisuallyHidden,
  SimpleGrid,
  useColorModeValue as mode,
} from '@chakra-ui/react';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';

import FilterForm from './FilterForm';

const Sidebar = ({ filters, setFilters, update, setUpdate }) => {
  const [countID, setCountID] = useState(1);

  const newFilter = () => {
    setFilters({ ...filters, [countID]: { id: countID } });
    setCountID(countID + 1);
  };

  const triggerUpdate = () => {
    setUpdate(true);
  };

  return (
    <div className="side">
      <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} mt="8" w={{ sm: 'full' }}>
        <Box
          bg={mode('white', 'gray.700')}
          py="8"
          px={{ base: '4', md: '10' }}
          shadow="base"
          rounded={{ sm: 'lg' }}
        >
          <Accordion>
            {Object.keys(filters).map((f, i) => (
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Filter {parseInt(i) + 1}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel>
                  <FilterForm
                    key={f}
                    id={f}
                    filters={filters}
                    setFilters={setFilters}
                  />
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
          {/* <DividerWithText mt="6"></DividerWithText> */}
          <Button
            onClick={() => {
              newFilter();
            }}
          >
            Add
          </Button>
          {/* figure something out for this later */}
          <Button
            colorScheme="green"
            onClick={() => {
              triggerUpdate();
            }}
          >
            Apply
          </Button>
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
