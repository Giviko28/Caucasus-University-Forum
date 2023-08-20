import '../css/post.css';
import ProfilePhoto from '../svg/profile-photo.svg';
import LikeIcon from '../svg/like.svg';
import DislikeIcon from '../svg/dislike.svg';
import {useStateContext} from "../contexts/StateContext";
import axiosClient from "./axios-client";

const Posts = ({posts}) => {
    const {user} = useStateContext();

    const Delete = (id) => {
        // ev.preventDefault();
        const payload = {id: id}
        axiosClient.post('/post/delete', payload)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    alert('Post deleted successfully');
                }
            })
            .catch(error => {
                if (error.response.status === 403) {
                    alert('You cant and shouldn\'t delete others posts!');
                }
                if (error.response.status === 404) {
                    alert('Post not found');
                }
            })
    }

    return (
        <div>
            {posts.map((post) => (
                <div className="post" key={post.id}>
                    <img src={ProfilePhoto} alt="profile photo not available" className="profile-photo" />
                    <div className="user-name">
                        <h3>{post.author.name}</h3>
                        <h5>{post.category.name}</h5>
                    </div>
                    <p>{post.body}</p>
                    <div className="post-details">
                        <h5>{post.created_at}</h5>
                        <div className="vl"></div>
                        <h4>Comments</h4>
                    </div>
                    <div className="reactions">
                        {user && user.id === post.author.id ? <button onClick={() => Delete(post.id)}>Delete</button> : ''}
                        <div className="likes">
                            <h4 className="counter">{post.likes}</h4>
                            <button>
                                <img src={LikeIcon} alt="icon not available" />
                            </button>
                        </div>
                        <div className="dislikes">
                            <button>
                                <img src={DislikeIcon} alt="icon not available" />
                            </button>
                            <h4 className="counter">{post.dislikes}</h4>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Posts;
