import { useEffect, useState } from "react";

const FilterForm = ({filters, setFilters, id}) => {
    const [year, setYear] = useState();
    const [party, setParty] = useState();
    const [fatality, setFatality] = useState();
    
    // on mount fill out the state
    
    // if empty we add a new instead of update
    
    // move this to sidebar potentially? yeah
    const newFilter = () => {
        
    }
    
    const updateFilter = () => {
        
    }

    return (
        <>
            <div>
                
            </div>
        </>
    )

}


export default FilterForm;