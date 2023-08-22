import ProfilePhoto from '../svg/profile-photo.svg';
import '../css/searching-profiles.css';
import LoadingSearchedUsers from './loading-components/LoadingSearchedUsers';
import useFetch from '../hooks/useFetch';
import {backendBaseUrl} from "../config";

const SearchingProfiles = ({searchQuery}) => {
    const payload = {keyword: searchQuery};
    const { data: users, isPending, error } = useFetch(`/users`, payload);

    return (
            <div className="searched-profiles">
                <h2 className='title'>Profiles</h2>
                <div className="users-container">
                    {isPending && <LoadingSearchedUsers />}
                    {error && {error}}
                    {!isPending && users && users.map((user, index) =>(
                    <div className='user' key={index}>
                        <img src={user.profile_picture ? backendBaseUrl + user.profile_picture : ProfilePhoto} alt="photo not found" />
                        <div className="user-details">
                            <h3 className='user-name'>{user.name}</h3>
                            <h5 className='user-school'>{user.category.name}</h5>
                        </div>
                    </div>
                    ))}

                    <div className='user' >
                        <img src={ProfilePhoto} alt="photo not found" />
                        <div className="user-details">
                            <h3 className='user-name'>username</h3>
                            <h5 className='user-school'>CST</h5>
                        </div>
                    </div>
                    <div className='user'>
                        <img src={ProfilePhoto} alt="photo not found" />
                        <div className="user-details"> 
                            <h3 className='user-name'>username</h3>
                            <h5 className='user-school'>CST</h5>
                        </div>
                    </div>
                </div>
                <button className="see-all-button">See all</button>
            </div>
    );
}

export default SearchingProfiles;
