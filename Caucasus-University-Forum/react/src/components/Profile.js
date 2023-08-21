import ProfilePhoto from '../svg/profile-photo.svg';
import {useStateContext} from "../contexts/StateContext";
import LoadingProfile from './loading-components/LoadingProfile';
import {useRef, useState} from "react";
import axiosClient from "./axios-client";
import {backendBaseUrl} from "../config";
import {findAllByLabelText} from "@testing-library/react";

function Profile({user}) {
    const pictureRef = useRef(null);
    const handleUpload = () => {
        if (pictureRef.current.files[0]) {
            const payload = {
                profile_picture: pictureRef.current.files[0]
            }
            axiosClient.postForm('/profile/uploadImage', payload)
                .then(response => {
                    alert('Profile updated');
                })
                .catch(error => {
                    alert('Profile update failed');
                })

        }
    }

    return (
        <div className="profile-icon">
            {user && user.profile_picture
                  ? (<label htmlFor="profile_picture">
                        <img src={backendBaseUrl + user.profile_picture} alt="img not available" />
                    </label> )
                  : (<label htmlFor="profile_picture">
                        <img src={ProfilePhoto} alt="img not available" />
                    </label>)}
            {user ? (<input ref={pictureRef} onChange={handleUpload} style={{display: "none"}} id="profile_picture"
                    name="profile_picture" type="file"/>)
                  : ''}
            <h2>{user ? user.name : 'Guest'}</h2>
        </div>
    );
}

export default Profile;
