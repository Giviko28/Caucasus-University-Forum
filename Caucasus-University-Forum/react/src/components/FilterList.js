import useFetch from '../hooks/useFetch';
import LoadingFilterList from './loading-components/LoadingFilterList';

const FilterList = ({handleFilter}) => {
    const { data: schools, isPending, error } = useFetch('/categories');
    
    return (
    <div className="filter-list">
        {isPending && <LoadingFilterList />}
        {error && <div> {error} </div> }
        {schools && schools.map((school) => (
            <button href={`/?category=${school.name}`} onClick={() => handleFilter(school.id)} key={school.id}>{school.name}</button>
        ))}
    </div>
  );
};

export default FilterList;
