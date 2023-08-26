import React from 'react';
import '../css/comment.css';
import ProfilePhoto from '../svg/profile-photo.svg';
import { backendBaseUrl } from '../config';

const Comments = ({ comments }) => {
    return (
        <div>
            {comments &&
                comments.map((comment) => (
                    <div className="comments" key={comment.id}>
                        <div className="comment">
                            <div className="commenter-info">{comment.author.name}</div>
                            <img
                                src={comment.author.profile_picture ? backendBaseUrl + comment.author.profile_picture : ProfilePhoto}
                                alt="photo not found"
                                className="commenter-photo"
                            />
                            <div className="comment-timestamp">{comment.created_at}</div>

                            <p className="comment-body">{comment.body}</p>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default Comments;
