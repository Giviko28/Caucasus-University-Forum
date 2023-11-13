import xButton from "../svg/x.svg";
import { backendBaseUrl } from "../config";
import ProfilePhoto from "../svg/profile-photo.svg";
import CommentsBox from "./CommentsBox";
import LikeIcon from "../svg/like.svg";
import DislikeIcon from "../svg/dislike.svg";
import { useStateContext } from "../contexts/StateContext";
import { useState } from "react";
import axiosClient from "./axios-client";
import { useFlashContext } from "../contexts/FlashContext";
import Reactions from "./Reactions";

const Post = ({ post }) => {
    const { user } = useStateContext();
    const [showComments, setShowComments] = useState("");
    const { setMessage } = useFlashContext();
    const Delete = (id) => {
        // ev.preventDefault();
        // const payload = {id: id}
        axiosClient
            .delete(`/post/${id}`)
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    setMessage("Post deleted successfully");
                }
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    setMessage("You cant and shouldn't delete others posts!");
                }
                if (error.response.status === 404) {
                    setMessage("Post not found");
                }
            });
    };

    return (
        <div className="post" key={post.id}>
            {user && user.id === post.author.id ? (
                <img
                    onClick={() => Delete(post.id)}
                    src={xButton}
                    alt="icon not found"
                    className="x-icon"
                />
            ) : (
                ""
            )}
            {post.author.profile_picture ? (
                <img
                    src={backendBaseUrl + post.author.profile_picture}
                    alt="profile photo not available"
                    className="profile-photo"
                />
            ) : (
                <img
                    src={ProfilePhoto}
                    alt="profile photo not available"
                    className="profile-photo"
                />
            )}
            <div className="user-name">
                <h3>{post.author.name}</h3>
                <h5>{post.category.name}</h5>
            </div>
            <p className="post-body">{post.body}</p>
            <div className="post-details">
                <h4>{post.created_at}</h4>
                <div className="vl"></div>
                <h4
                    className="comments-button"
                    onClick={() => setShowComments(post.id)}
                >
                    comments
                </h4>
                {showComments === post.id && (
                    <CommentsBox
                        post={post}
                        setShowComments={setShowComments}
                    />
                )}
            </div>
            <Reactions post={post} />
            {/*<div className="reactions">*/}
            {/*    <div className="likes">*/}
            {/*        <h4 className="counter">{post.likes}</h4>*/}
            {/*        <button onClick={() => Like(post.id)}>*/}
            {/*            <img src={LikeIcon} alt="icon not available" />*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*    <div className="dislikes">*/}
            {/*        <button onClick={() => Dislike(post.id)}>*/}
            {/*            <img src={DislikeIcon} alt="icon not available" />*/}
            {/*        </button>*/}
            {/*        <h4 className="counter">{post.dislikes}</h4>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};
export default Post;
