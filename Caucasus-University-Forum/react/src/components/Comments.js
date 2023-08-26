import '../css/comment.css';
import ProfilePhoto from '../svg/profile-photo.svg';



const Comments = () => {

    return (  
        <div className="comments">
            <div className="comment">
                <div className="commenter-info">GeorgeDolee · CST</div>
                <img src={ProfilePhoto} alt="photo not found" className="commenter-photo" />

                <p className="comment-body">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit assumenda aperiam nemo perspiciatis ducimus fuga
                </p>
            </div>
        </div>
    );
}
 
export default Comments;