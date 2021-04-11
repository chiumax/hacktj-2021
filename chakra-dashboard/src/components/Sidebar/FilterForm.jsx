import { useEffect, useState } from 'react';

import {
  Button,
  FormControl,
  FormLabel,
  Checkbox,
  CheckboxGroup,
  Input,
  Stack,
  SimpleGrid,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';

const FilterForm = ({ filters, setFilters, id }) => {
  // on mount fill out the state
  const [year, setYear] = useState(filters[id].year);
  const [party, setParty] = useState(filters[id].party);
  const [fatality, setFatality] = useState(filters[id].fatality);

  const updateFilter = (c, e) => {
    let updatedFilter = filters;
    updatedFilter[id][c] = e;
    // updatedFilter[id] = {
    //   id: id,
    //   year: year,
    //   party: party,
    //   fatality: fatality,
    // };
    // console.log(updatedFilter);
    setFilters({ ...updatedFilter });
  };

  const delFilter = () => {
    let updatedFilter = filters;
    delete updatedFilter[id];
    setFilters({ ...updatedFilter });
  };

  return (
    <>
      <CheckboxGroup
        onChange={e => {
          updateFilter('year', e);
        }}
        defaultValue={filters[id].year}
      >
        <FormLabel>Year</FormLabel>
        <SimpleGrid spacing={5} columns={2}>
          <Checkbox value="2018">2018</Checkbox>
          <Checkbox value="2019">2019</Checkbox>
          <Checkbox value="2020">2020</Checkbox>
          <Checkbox value="2021">2021</Checkbox>
        </SimpleGrid>
      </CheckboxGroup>
      <CheckboxGroup
        onChange={e => {
          updateFilter('party', e);
        }}
        defaultValue={filters[id].party}
      >
        <FormLabel>Parties Involved</FormLabel>
        <SimpleGrid spacing={5} columns={2}>
          <Checkbox value="pedestrian">Pedestrian</Checkbox>
          <Checkbox value="cycle">Cyclist</Checkbox>
        </SimpleGrid>
      </CheckboxGroup>
      <CheckboxGroup
        onChange={e => {
          updateFilter('fatality', e);
        }}
        defaultValue={filters[id].fatality}
      >
        <FormLabel>Fatality</FormLabel>
        <SimpleGrid spacing={5} columns={2}>
          <Checkbox value="fatal">Major Injury</Checkbox>
          <Checkbox value="minor">Minor Injury</Checkbox>
        </SimpleGrid>
      </CheckboxGroup>
      {Object.keys(filters).length > 1 ? (
        <Button
          colorScheme="red"
          onClick={() => {
            delFilter();
          }}
        >
          Remove Filter
        </Button>
      ) : (
        <></>
      )}
    </>
  );
};

export default FilterForm;
