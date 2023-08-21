import ProfilePhoto from '../svg/profile-photo.svg';
import '../css/searching-profiles.css';

const SearchingProfiles = ({searchQuery}) => {
    const { data: users, isPending, error } = useFetch('/posts', searchQuery); 
    //აქ ზემოთ იუზერები ამოიღე როგორც უნდა, სხვა იუზერები ზოგადად არა ის რომელიც ავტორიზებულია და ამას ეძებს

    return (  
            <div className="searched-profiles">
            {/* // {users.map((user) => ( */}
                <div className='user'>
                    <img src={ProfilePhoto} alt="photo not found" />
                    <div className="user-details">
                        <h3 className='user-name'>username</h3>
                        <h5 className='user-school'>cst</h5>
                    </div>
                </div>



                <div className='user'>
                    <img src={ProfilePhoto} alt="photo not found" />
                    <div className="user-details">
                        <h3 className='user-name'>username</h3>
                        <h5 className='user-school'>cst</h5>
                    </div>
                </div>
                <div className='user'>
                    <img src={ProfilePhoto} alt="photo not found" />
                    <div className="user-details">
                        <h3 className='user-name'>username</h3>
                        <h5 className='user-school'>cst</h5>
                    </div>
                </div>




                <div className='user'>
                    <img src={ProfilePhoto} alt="photo not found" />
                    <div className="user-details">
                        <h3 className='user-name'>username</h3>
                        <h5 className='user-school'>cst</h5>
                    </div>
                </div>

                <div className='user'>
                    <img src={ProfilePhoto} alt="photo not found" />
                    <div className="user-details">
                        <h3 className='user-name'>username</h3>
                        <h5 className='user-school'>cst</h5>
                    </div>
                </div>

                <div className='user'>
                    <img src={ProfilePhoto} alt="photo not found" />
                    <div className="user-details">
                        <h3 className='user-name'>username</h3>
                        <h5 className='user-school'>cst</h5>
                    </div>
                </div>
            {/* // )} */}
            </div>
    );
}
 
export default SearchingProfiles;