import { useEffect, useState } from 'react';

import Sidebar from './Sidebar/Sidebar';
import MapComponent from './MapComponent/MapComponent';

const DataManager = () => {
  const [filters, setFilters] = useState({
    0: { id: 0 },
  });
  const colors = ['#4b8aa3', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51'];
  const [update, setUpdate] = useState(0);

  return (
    <>
      <Sidebar
        filters={filters}
        setFilters={setFilters}
        update={update}
        setUpdate={setUpdate}
        colors={colors}
      />
      <MapComponent
        filters={filters}
        setFilters={setFilters}
        uu={update}
        setUU={setUpdate}
      />
    </>
  );
};

export default DataManager;
