import '../../css/loading-searched-users.css';
const LoadingSearchedUsers = () => {
    return (  
        Array.from({length: 6}).map(() => 
            <div className='loading-searched-user'>
                <div className="loading-user-photo"></div>
                <div className="loading-user-details">
                    <div className='loading-user-name'></div>
                    <div className='loading-user-school'></div>
                </div>
            </div>
        )
    );
}
 
export default LoadingSearchedUsers;