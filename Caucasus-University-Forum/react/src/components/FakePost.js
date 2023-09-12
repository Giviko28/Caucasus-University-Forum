import xButton from "../svg/x.svg";
import {backendBaseUrl} from "../config";
import ProfilePhoto from "../svg/profile-photo.svg";
import CommentsBox from "./CommentsBox";
import LikeIcon from "../svg/like.svg";
import DislikeIcon from "../svg/dislike.svg";
import {useStateContext} from "../contexts/StateContext";
import {useFlashContext} from "../contexts/FlashContext";
import axiosClient from "./axios-client";
import {useState} from "react";


const FakePost = ({post}) => {
    // Eseni shemosatania timeline-idan es prosta vtestavdi da dro ar mindoda damexarja da aq davtove
    const {user} = useStateContext();
    const [showComments, setShowComments] = useState('');
    const {setMessage} = useFlashContext();
    const Delete = (id) => {
        // ev.preventDefault();
        // const payload = {id: id}
        axiosClient.post(`/post/delete/${id}`)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    setMessage('Post deleted successfully');
                }
            })
            .catch(error => {
                if (error.response.status === 403) {
                    setMessage('You cant and shouldn\'t delete others posts!');
                }
                if (error.response.status === 404) {
                    setMessage('Post not found');
                }
            })
    }
    const Like = (id) => {
        axiosClient.post(`/post/like/${id}`)
            .then(response => {
                setMessage(response.data.message);
            })
            .catch(error => {
                setMessage(error);
            })
    }
    const Dislike = (id) => {
        axiosClient.post(`/post/dislike/${id}`)
            .then(response => {
                setMessage(response.data.message);
            })
            .catch(error => {
                setMessage(error);
            })
    }

    return (
        <div className="post">
            {post.author && post.author.profile_picture
                ? <img src={backendBaseUrl + post.author.profile_picture } alt="profile photo not available" className="profile-photo" />
                : <img src={ProfilePhoto} alt="profile photo not available" className="profile-photo" />
            }
            <div className="user-name">
                <h3>{post.author && post.author.name ? post.author.name : ""}</h3>
                <h5>{post.category && post.category.name ? post.category.name : ""}</h5>
            </div>
            <p className='post-body'>{post.body ? post.body : ""}</p>
            <div className="post-details">
                <h4>{post.created_at ? post.created_at : ""}</h4>
                <div className="vl"></div>
                <h4 className="comments-button" onClick={() => setShowComments(post.id)}>comments</h4>
                {showComments === post.id && <CommentsBox post={post} setShowComments={setShowComments}/>}
            </div>
            <div className="reactions">
                <div className="likes">
                    <h4 className="counter">{post.likes ? post.likes : ""}</h4>
                    <button onClick={() => Like(post.id)}>
                        <img src={LikeIcon} alt="icon not available" />
                    </button>
                </div>
                <div className="dislikes">
                    <button onClick={() => Dislike(post.id)}>
                        <img src={DislikeIcon} alt="icon not available" />
                    </button>
                    <h4 className="counter">{post.dislikes ? post.dislikes : ""}</h4>
                </div>
            </div>
        </div>
    )
}

export default FakePost;
