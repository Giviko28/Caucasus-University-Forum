import React, { useEffect, useState } from "react";
import LikeIcon from "../svg/like.svg";
import ActiveLikeIcon from "../svg/likeActive.svg";
import DislikeIcon from "../svg/dislike.svg";
import ActiveDislikeIcon from "../svg/activeDislike.svg";
import axiosClient from "./axios-client";
import { useFlashContext } from "../contexts/FlashContext";
import { useStateContext } from "../contexts/StateContext";

export default function Reactions({ post }) {
    const { user } = useStateContext();
    const { setMessage } = useFlashContext();
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);
    const [likes, setLikes] = useState(post.likes);
    const [dislikes, setDislikes] = useState(post.dislikes);
    const Like = (id) => {
        if (!user) {
            setMessage("Login to like");
            return;
        }
        axiosClient
            .post(`/post/like/${id}`)
            .then((response) => {
                const isItLiked = response.data.is_like;
                setIsLiked(isItLiked);
                setLikes((likes) => (isItLiked ? likes + 1 : likes - 1));
                setMessage(response.data.message);
                if (isItLiked && isDisliked) {
                    setIsDisliked(false);
                    setDislikes((dislike) => dislike - 1);
                }
            })
            .catch((error) => {
                setIsLiked(false);
                setLikes((likes) => likes - 1);
                setMessage(error);
            });
    };
    const Dislike = (id) => {
        if (!user) {
            setMessage("Login to dislike");
            return;
        }
        axiosClient
            .post(`/post/dislike/${id}`)
            .then((response) => {
                // is_like in db is 0, so to avoid the value being false, i did ! to reverse it
                const isItDisliked = !response.data.is_like;
                setIsDisliked(isItDisliked);
                setDislikes((dislikes) =>
                    isItDisliked ? dislikes + 1 : dislikes - 1,
                );
                if (isItDisliked && isLiked) {
                    setIsLiked(false);
                    setLikes((like) => like - 1);
                }
            })
            .catch((error) => {
                setMessage(error);
            });
    };

    useEffect(() => {
        if (!user) {
            setIsLiked(false);
            setIsDisliked(false);
            return;
        }
        post.allUsers.forEach((instance) => {
            if (instance.user_id === user.id) {
                instance.is_like ? setIsLiked(true) : setIsDisliked(true);
            }
        });
    }, [user]);

    // useEffect(() => {
    //     axiosClient
    //         .post(`/post/like/isLiked/${post.id}`)
    //         .then((response) => {
    //             setIsLiked(response.data.is_like);
    //         })
    //         .then((error) => {
    //             console.log(error);
    //         });
    // }, []);

    return (
        <div className="reactions">
            <div className="likes">
                <h4 className="counter">{likes}</h4>
                <button onClick={() => Like(post.id)}>
                    <img
                        src={isLiked ? ActiveLikeIcon : LikeIcon}
                        alt="icon not available"
                    />
                </button>
            </div>
            <div className="dislikes">
                <button onClick={() => Dislike(post.id)}>
                    <img
                        src={isDisliked ? ActiveDislikeIcon : DislikeIcon}
                        alt="icon not available"
                    />
                </button>
                <h4 className="counter">{dislikes}</h4>
            </div>
        </div>
    );
}
