import '../css/comments.css';
import axiosClient from "./axios-client";
import {useFlashContext} from "../contexts/FlashContext";
import {backendBaseUrl} from "../config";
import {useStateContext} from "../contexts/StateContext";
import ProfilePhoto from '../svg/profile-photo.svg';
import goBack from '../svg/go-back-arrow.svg';
import addImage from '../svg/add-image.svg';
import LikeIcon from '../svg/like.svg';
import DislikeIcon from '../svg/dislike.svg';

const Comments = ({postId, postAuthor, likes, dislikes}) => {
    const {user, isPending} = useStateContext();
    const commentRefs = {};
    const {setMessage} = useFlashContext();
    // const {data: comments, isPending, error} = usefetch()

    const comment = (e) => {
        const payload = {body: commentRefs[postId].value};
        if (e.key === 'Enter') {
            axiosClient.post(`/post/comment/${postId}`, payload)
                .then(response => {
                    setMessage(response.data.message)
                })
                .catch(error => {
                    if(error.response.status === 422) {
                        setMessage('You can\'t write an empty comment');
                    }
                })
        }
    }

    return ( 
        <div className="comment-box">
            <div className="comments-container">
                <div className="header">
                    <img src={goBack} alt="icon not found" className='go-back-arrow'/>

                    <div className="post-author">
                        <h2>{postAuthor}'s post</h2>
                    </div>

                    <div className="reactions-in-comments">
                        <h4 className="like-counter">150</h4>
                        <button className='like-button'>
                            <img src={LikeIcon} alt="icon not available" />
                        </button>
                        <button className='dislike-button'>
                            <img src={DislikeIcon} alt="icon not available" />
                        </button>
                        <h4 className="dislike-counter">35</h4>
                    </div>
                </div>
                

                <div className='comments'>

                </div>

                <div className="write-comment">
                    {user && user.profile_picture
                        ? <img src={backendBaseUrl + user.profile_picture } alt="profile photo not available" className="comments-profile-photo" />
                        : <img src={ProfilePhoto} alt="profile photo not available" className="comments-profile-photo" />
                    }

                    <textarea id='inp' onKeyDown={(e) => comment(e)} ref={(input) => commentRefs[postId] = input} type="text" placeholder='make a comment'/>

                    <div className="make-comment">
                        <img src={addImage} alt="icon not found" className='add-photo'/>
                        <button>Comment</button>
                    </div>
                </div>
            </div>   
        </div>
     );
}
 
export default Comments;