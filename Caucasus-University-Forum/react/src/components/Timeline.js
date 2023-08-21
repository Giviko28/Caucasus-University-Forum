import WritePost from "./WritePost";
import Posts from './Posts';
import useFetch from '../hooks/useFetch';
import LoadingPosts from "./loading-components/LoadingPosts";
import SearchingProfiles from "./SearchingProfiles";

const Timeline = ({filterSchool, searchQuery, isSearched}) => {
    const payload = {
        category: filterSchool,
        keyword: searchQuery
    };
    const { data: posts, isPending: postsPending, error: postsError } = useFetch('/posts', payload);
    const { data: users, isPending: usersPenging, error: usersError } = useFetch('/posts', payload.searchQuery); 
    //აქ ზემოთ იუზერები ამოიღე როგორც უნდა, სხვა იუზერები ზოგადად არა ის რომელიც ავტორიზებულია და ამას ეძებს

    return (
        <div className="timeline">
            {!isSearched && <WritePost />}
            {isSearched && <SearchingProfiles users={users}/> }
            {postsPending && Array.from({ length: 2 }).map((_, index) => (
                <LoadingPosts key={index} />
            ))}
            {postsError && <div> {postsError} </div> }
            {posts && <Posts posts={posts} />}
        </div>
    );
}

export default Timeline;
