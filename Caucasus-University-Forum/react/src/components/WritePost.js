import '../css/write-post.css';
import ProfilePhoto from '../svg/profile-photo.svg';
import MakePost from '../svg/make-post.svg';
import AddImage from '../svg/add-image.svg';
import {useStateContext} from "../contexts/StateContext";
import {useRef} from "react";
import axiosClient from "./axios-client";
import LoadingWritePost from './loading-components/LoadingWritePost';
import {backendBaseUrl} from "../config";
import {useFlashContext} from "../contexts/FlashContext";

const WritePost = () => {
    const {user, isPending} = useStateContext();
    const {setMessage} = useFlashContext();
    const bodyRef = useRef();
    const imagesRef = useRef();
    const btnRef = useRef();

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            btnRef.current.click(); // Enter-is dacheris dros daipostos posti
        }
    }

    const publish = (ev) => {
        ev.preventDefault();
        const payload = {
            body: bodyRef.current.value,
            images: imagesRef.current.files
        };
        axiosClient.postForm('/post', payload)
            .then(response => {
                bodyRef.current.blur(); // Dapostvis mere focus-ed agar aris inputi
                bodyRef.current.value = ''; // dapostvis mere inputi carieldeba
                setMessage(response.data.message);
            })
            .catch(error => {
                if (error.response.status === 401) {
                    setMessage('Please login');
                }
                if (error.response.status === 403) {
                    setMessage('You\'ve exceeded your daily post limit')
                }
                if (error.response.status === 422) {
                    setMessage('Input fields are incorrect');
                }
            })
    }

    return (
        <div className="write-post">
            {isPending && <LoadingWritePost />}
            {!isPending &&
                <div className="user-information">
                    {user && user.profile_picture
                        ? <img src={backendBaseUrl + user.profile_picture } alt="profile photo not available" className="profile-photo" />
                        : <img src={ProfilePhoto} alt="profile photo not available" className="profile-photo" />
                    }
                    <h3>{user ? user.name : 'Guest'}</h3>
                </div>
            }
            <img src={MakePost} alt="icon not available" className="make-post-icon" />
            <textarea onKeyDown={(e) => handleEnter(e)} ref={bodyRef} placeholder="What's On Your Mind?"></textarea>
            <label htmlFor="images"><img src={AddImage} alt="icon not available" className="add-image" /></label>
            {/*<img src={AddImage} alt="icon not available" className="add-image" />*/}
            <input ref={imagesRef} style={{display: 'none'}} name='images'  id='images' type="file" multiple/>
            <button ref={btnRef} onClick={publish}>Publish</button>
        </div>
    );
}

export default WritePost;
