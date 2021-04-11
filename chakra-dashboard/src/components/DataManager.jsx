import { useEffect, useState } from 'react';

import Sidebar from './Sidebar/Sidebar';
import MapComponent from './MapComponent/MapComponent';

const DataManager = () => {
  const [filters, setFilters] = useState({
    0: { id: 0, year: '2020', party: 'bike', fatality: 'yes' },
  });

  const [update, setUpdate] = useState(false);

  return (
    <>
      <Sidebar
        filters={filters}
        setFilters={setFilters}
        update={update}
        setUpdate={setUpdate}
      />
      <MapComponent
        filters={filters}
        setFilters={setFilters}
        update={update}
        setUpdate={setUpdate}
      />
    </>
  );
};

export default DataManager;
