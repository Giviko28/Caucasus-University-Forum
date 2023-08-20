import '../css/write-post.css';
import ProfilePhoto from '../svg/profile-photo.svg';
import MakePost from '../svg/make-post.svg';
import AddImage from '../svg/add-image.svg';
import {useStateContext} from "../contexts/StateContext";
import {useRef} from "react";
import axiosClient from "./axios-client";

const WritePost = () => {
    const {user} = useStateContext();
    const bodyRef = useRef();
    const onClick = (ev) => {
        ev.preventDefault();
        const payload = {
            body: bodyRef.current.value
        };
        axiosClient.post('/post', payload)
            .then(response => {
                alert(response.data.message);
            })
            .catch(error => {
                if (error.response.status === 401) {
                    alert('Please login');
                }
                if (error.response.status === 422) {
                    alert('Input fields are incorrect');
                }
            })
    }

    return (
        <div className="write-post">
            <div className="user-information">
                <img src={ProfilePhoto} alt="profile photo not available" className="profile-photo" />
                <h3 style={{marginLeft: '0.5rem'}}>{user ? user.name : 'Guest'}</h3>
            </div>
            <img src={MakePost} alt="icon not available" className="make-post-icon" />
            <textarea ref={bodyRef} placeholder="What's On Your Mind?"></textarea>
            <img src={AddImage} alt="icon not available" className="add-image" />
            <button onClick={onClick}>Publish</button>
        </div>
    );
}

export default WritePost;
