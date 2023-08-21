import '../css/post.css';
import ProfilePhoto from '../svg/profile-photo.svg';
import LikeIcon from '../svg/like.svg';
import DislikeIcon from '../svg/dislike.svg';
import xButton from '../svg/x.svg';
import {useStateContext} from "../contexts/StateContext";
import axiosClient from "./axios-client";
import {backendBaseUrl} from "../config";

const Posts = ({posts}) => {
    const {user} = useStateContext();

    const Delete = (id) => {
        // ev.preventDefault();
        // const payload = {id: id}
        axiosClient.post(`/post/delete/${id}`)
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
                    {user && user.id === post.author.id ? <img onClick={() => Delete(post.id)} src={xButton} alt='icon not found' className='x-icon' />: ''}
                    {post.author.profile_picture
                        ? <img src={backendBaseUrl + post.author.profile_picture } alt="profile photo not available" className="profile-photo" />
                        : <img src={ProfilePhoto} alt="profile photo not available" className="profile-photo" />
                    }
                    <div className="user-name">
                        <h3>{post.author.name}</h3>
                        <h5>{post.category.name}</h5>
                    </div>
                    <p>{post.body}</p>
                    <div className="post-details">
                        <h5>12:27</h5>
                        <div className="vl"></div>
                        <h4>Comments</h4>
                    </div>
                    <div className="reactions">
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
