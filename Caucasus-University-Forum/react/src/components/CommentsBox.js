import '../css/comments-box.css';
import axiosClient from "./axios-client";
import Comments from './Comments';
import {useFlashContext} from "../contexts/FlashContext";
import {backendBaseUrl} from "../config";
import {useStateContext} from "../contexts/StateContext";
import ProfilePhoto from '../svg/profile-photo.svg';
import goBack from '../svg/go-back-arrow.svg';
import addImage from '../svg/add-image.svg';
import LikeIcon from '../svg/like.svg';
import DislikeIcon from '../svg/dislike.svg';
import {useEffect, useState} from 'react';
import useFetch from "../hooks/useFetch";

const CommentsBox = ({post, setShowComments}) => {
    const {user, isPending} = useStateContext();
    const commentRefs = {};
    const {setMessage} = useFlashContext();
    //isPending amovige ukve arsebobda
    // const {data: comments,error} = useFetch(`post/${post.id}/comments`);
    const [comments, setComments] = useState([]);
    const [shouldRefetch, setShouldRefetch] = useState(false);

    const fetchComments = () => {
        axiosClient.get(`post/${post.id}/comments`)
            .then(response => {
                setComments(response.data);
                setShouldRefetch(false);
            })
            .catch(error => {
                console.error("Error fetching comments:", error);
                setShouldRefetch(false);
            });
    };

    useEffect(() => {
        fetchComments();
    }, [post.id, shouldRefetch]);
    const comment = (e) => {
        const payload = {body: commentRefs[post.id].value};
        if (e.key === 'Enter') {
            e.preventDefault();
            axiosClient.post(`/post/comment/${post.id}`, payload)
                .then(response => {
                    setShouldRefetch(true);
                    commentRefs[post.id].value = '';
                    commentRefs[post.id].blur();
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
                    <img src={goBack} alt="icon not found" className='go-back-arrow' onClick={() => setShowComments('')}/>

                    <div className="post-author">
                        <h2>{post.author.name}'s post</h2>
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


                <Comments comments={comments} />

                <div className="write-comment">
                    {user && user.profile_picture
                        ? <img src={backendBaseUrl + user.profile_picture } alt="profile photo not available" className="comments-profile-photo" />
                        : <img src={ProfilePhoto} alt="profile photo not available" className="comments-profile-photo" />
                    }

                    <textarea id='inp' onKeyDown={(e) => comment(e)} ref={(input) => commentRefs[post.id] = input} type="text" placeholder='make a comment'/>

                    <div className="make-comment">
                        <img src={addImage} alt="icon not found" className='add-photo'/>
                        <button>Comment</button>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default CommentsBox;
