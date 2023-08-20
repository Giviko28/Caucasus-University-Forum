import '../../css/loading-posts.css';

const LoadingPosts = () => {
    return (  
        <div className="loading-post">
            <div className="loading-profile-photo"></div>

            <div className="loading-user-info">
                <div className="loading-name"></div>
                <div className="loading-school"></div>
            </div>

            <p className='loading-body'>
                <div className='loading-text'></div>
                <div className='loading-text'></div>
                <div className='loading-text'></div>
            </p>
        </div>
    );
}
 
export default LoadingPosts;