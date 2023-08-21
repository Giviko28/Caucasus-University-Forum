
const LoadingSearchedUsers = () => {
    return (  
        Array.from({length: 9}).map(() => 
            <div className='loading-searched-user'>
                <div className="loading-user-photo"></div>
                <div className="loading-user-details">
                    <h3 className='loadijg-user-name'>username</h3>
                    <h5 className='loading-user-school'>cst</h5>
                </div>
            </div>
        )
    );
}
 
export default LoadingSearchedUsers;