import { useEffect, useState } from "react";

import Sidebar from "./Sidebar/Sidebar";
import MapComponent from "./MapComponent/MapComponent";

const DataManager = () => {
    const [filters, setFilters] = useState();

    return (
        <>
            <Sidebar filters={filters} setFilters={setFilters} />
            {/* <MapComponent filters={filters} setFilters={setFilters} /> */}
        </>
    )

}


export default DataManager;