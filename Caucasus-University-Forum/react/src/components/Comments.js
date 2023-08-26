import '../css/comment.css';
import ProfilePhoto from '../svg/profile-photo.svg';



const Comments = () => {

    return (  
        <div className="comments">
            <div className="comment">
                <div className="commenter-info">GeorgeDolee · CST</div>
                <img src={ProfilePhoto} alt="photo not found" className="commenter-photo" />
                <div className="comment-timestamp">1s ago</div>
                
                <p className="comment-body">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            </div>
        </div>
    );
}
 
export default Comments;