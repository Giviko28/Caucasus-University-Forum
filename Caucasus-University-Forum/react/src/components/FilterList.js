import {useEffect, useState} from "react";
import axiosClient from "./axios-client";
import {getCategories} from "../hooks/getCategories";

const FilterList = ({handleFilter}) => {
    const [schools, setSchools] = useState(null)
    useEffect(() => {
       getCategories(setSchools);
    }, []);

    return (
    <div className="filter-list">
        {schools && schools.map((school) => (
            <button href={`/?category=${school.name}`} style={{
                marginTop: '5px'
            }} onClick={() => handleFilter(school.id)} key={school.id}>{school.name}</button>
        ))}
    </div>
  );
};

export default FilterList;
