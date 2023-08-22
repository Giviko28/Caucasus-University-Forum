import ProfilePhoto from '../svg/profile-photo.svg';
import '../css/searching-clubs.css';
import LoadingSearchedUsers from './loading-components/LoadingSearchedUsers';
import useFetch from '../hooks/useFetch';

const SearchingClubs = ({searchQuery}) => {
    // const { data: clubs, isPending, error } = useFetch(); 
    //აქ ზემოთ იუზერები ამოიღე როგორც უნდა, სხვა იუზერები ზოგადად არა ის რომელიც ავტორიზებულია და ამას ეძებს

    return (  
            <div className="searched-clubs">
                <h2 className='title'>Clubs</h2>

                {/* {isPending && <LoadingSearchedUsers />}
                {error && {error}} */}
                
                {/* // {!isPending && users.slice(0, 2).map((user) => ( */}
                <div className="clubs-container">
                    <div className='club'>
                        <img src={ProfilePhoto} alt="photo not found" />
                        <h3 className='club-name'>club name</h3>
                    </div>
                    <div className='club'>
                        <img src={ProfilePhoto} alt="photo not found" />
                        <h3 className='club-name'>club name</h3>
                    </div>
                {/* // )} */}
                </div>
                <button className='see-all-button'>See all</button>
            </div>
    );
}
 
export default SearchingClubs;