
const FilterList = ({handleFilter}) => {
    const schools = ['CSB', 'CSL', 'CSM', 'CST', 'CSA', 'CSG', 'CSH', 'CTS', 'CMS', 'CSE', 'CES'];
    return (
    <div className="filter-list">
        {schools.map((school, index) => (
            <button style={{
                marginTop: '5px'
            }} onClick={() => handleFilter({school})} key={index+1}>#{school}</button>
        ))}
    </div>
  );
};

export default FilterList;