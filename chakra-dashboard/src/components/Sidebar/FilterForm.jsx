import { useEffect, useState } from 'react';

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';

const FilterForm = ({ filters, setFilters, id }) => {
  console.log(filters);
  console.log(id);

  const [year, setYear] = useState(filters[id].year);
  const [party, setParty] = useState(filters[id].party);
  const [fatality, setFatality] = useState(filters[id].fatality);

  // on mount fill out the state

  // if empty we add a new instead of update

  // move this to sidebar potentially? yeah
  const newFilter = () => {};

  const updateFilter = () => {
    let updatedFilter = filters;
    updatedFilter[id] = {
      id: id,
      year: year,
      party: party,
      fatality: fatality,
    };
    setFilters(updatedFilter);
  };

  return (
    <>
      <div></div>
    </>
  );
};

export default FilterForm;
