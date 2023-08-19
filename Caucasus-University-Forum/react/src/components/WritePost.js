import '../css/write-post.css';
import ProfilePhoto from '../svg/profile-photo.svg';
import MakePost from '../svg/make-post.svg';
import AddImage from '../svg/add-image.svg';
import {useStateContext} from "../contexts/StateContext";

const WritePost = () => {
    const {user} = useStateContext();
    return (
        <div className="write-post">
            <div className="user-information">
                <img src={ProfilePhoto} alt="profile photo not available" className="profile-photo" />
                <h3 style={{marginLeft: '0.5rem'}}>{user ? user.name : 'Guest'}</h3>
            </div>
            <img src={MakePost} alt="icon not available" className="make-post-icon" />
            <textarea placeholder="What's On Your Mind?"></textarea>
            <img src={AddImage} alt="icon not available" className="add-image" />
            <button>Publish</button>
        </div>
    );
}

export default WritePost;
