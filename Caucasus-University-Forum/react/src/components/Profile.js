import ProfilePhoto from '../svg/profile-photo.svg';
import {useStateContext} from "../contexts/StateContext";
import LoadingProfile from './loading-components/LoadingProfile';

function Profile({user}) {

    return (
        <div className="profile-icon">
            <img src={ProfilePhoto} alt="img not available" /> 
            <h2>{user ? user.name : 'Guest'}</h2>
        </div>
    );
}

export default Profile;
