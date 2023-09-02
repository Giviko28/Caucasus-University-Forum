import '../css/post.css';
import CommentsBox from './CommentsBox';
import ProfilePhoto from '../svg/profile-photo.svg';
import LikeIcon from '../svg/like.svg';
import DislikeIcon from '../svg/dislike.svg';
import xButton from '../svg/x.svg';
import {useStateContext} from "../contexts/StateContext";
import axiosClient from "./axios-client";
import {backendBaseUrl} from "../config";
import {useState} from "react";
import {useFlashContext} from "../contexts/FlashContext";

const Posts = ({posts}) => {
    const {user} = useStateContext();
    const {setMessage} = useFlashContext();
    const [showComments, setShowComments] = useState('');

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
        <div>
            {posts.map((post) => {
                return (
                <div className="post" key={post.id}>
                    {user && user.id === post.author.id ? <img onClick={() => Delete(post.id)} src={xButton} alt='icon not found' className='x-icon' />: ''}
                    {post.author.profile_picture
                        ? <img src={backendBaseUrl + post.author.profile_picture } alt="profile photo not available" className="profile-photo" />
                        : <img src={ProfilePhoto} alt="profile photo not available" className="profile-photo" />
                    }
                    <div className="user-name">
                        <h3>{post.author.name}</h3>
                        <h5>{post.category.name}</h5>
                    </div>
                    <p className='post-body'>{post.body}</p>
                    <div className="post-details">
                        <h4>{post.created_at}</h4>
                        <div className="vl"></div>
                        <h4 className="comments-button" onClick={() => setShowComments(post.id)}>comments</h4>
                        {showComments === post.id && <CommentsBox post={post} setShowComments={setShowComments}/>}
                    </div>
                    <div className="reactions">
                        <div className="likes">
                            <h4 className="counter">{post.likes}</h4>
                            <button onClick={() => Like(post.id)}>
                                <img src={LikeIcon} alt="icon not available" />
                            </button>
                        </div>
                        <div className="dislikes">
                            <button onClick={() => Dislike(post.id)}>
                                <img src={DislikeIcon} alt="icon not available" />
                            </button>
                            <h4 className="counter">{post.dislikes}</h4>
                        </div>
                    </div>
                </div>
            )})}
        </div>
    );
}

export default Posts;
