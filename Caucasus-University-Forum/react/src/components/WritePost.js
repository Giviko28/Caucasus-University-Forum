import '../css/write-post.css';
import ProfilePhoto from '../svg/profile-photo.svg';
import MakePost from '../svg/make-post.svg';
import AddImage from '../svg/add-image.svg';
import { useStateContext } from "../contexts/StateContext";
import { useRef, useState } from "react";
import axiosClient from "./axios-client";
import LoadingWritePost from './loading-components/LoadingWritePost';
import { backendBaseUrl } from "../config";
import { useFlashContext } from "../contexts/FlashContext";

const WritePost = () => {
    const { user, isPending } = useStateContext();
    const { setMessage } = useFlashContext();
    const bodyRef = useRef();
    const imagesRef = useRef();
    const btnRef = useRef();
    const [selectedImages, setSelectedImages] = useState([]);

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            // btnRef.current.click(); // Enter-is dacheris dros daipostos posti
        }
    }

    const handleImageSelection = (e) => {
        setSelectedImages([...selectedImages, ...e.target.files]);
    };

    const deleteSelectedImage = (index) => {
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
    };

    const publish = (ev) => {
        ev.preventDefault();
        const payload = {
            body: bodyRef.current.value,
            images: selectedImages
        };
        axiosClient.postForm('/post', payload)
            .then(response => {
                bodyRef.current.blur();
                bodyRef.current.value = '';
                setMessage(response.data.message);
                setSelectedImages([]); 
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
                        ? <img src={backendBaseUrl + user.profile_picture} alt="profile photo not available" className="profile-photo" />
                        : <img src={ProfilePhoto} alt="profile photo not available" className="profile-photo" />
                    }
                    <h3>{user ? user.name : 'Guest'}</h3>
                </div>
            }
            <img src={MakePost} alt="icon not available" className="make-post-icon" />

            <textarea onKeyDown={(e) => handleEnter(e)} ref={bodyRef} placeholder="What's On Your Mind?"></textarea>

            <label htmlFor="images" className='label-add-image'><img src={AddImage} alt="icon not available" className="add-image" /></label>
            <input ref={imagesRef} style={{ display: 'none' }} name='images' id='images' type="file" multiple onChange={handleImageSelection} />

            {selectedImages.length > 0 && 
                <div className="selected-images">
                    {selectedImages.slice(0, 5).map((image, index) => (
                        <div className="selected-image-container">
                            <img key={index} src={URL.createObjectURL(image)} alt={'image not found'} className="selected-image" />
                            <div className='delete-icon' onClick={() => deleteSelectedImage(index)}>X</div>
                        </div>
                    ))}
                </div>
            }
                

            <button ref={btnRef} onClick={publish}>Publish</button>
        </div>
    );
}

export default WritePost;
