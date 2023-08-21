import WritePost from "./WritePost";
import Posts from './Posts';
import useFetch from '../hooks/useFetch';
import LoadingPosts from "./loading-components/LoadingPosts";
import SearchingProfiles from "./SearchingProfiles";
import SearchingClubs from "./SearchingClubs";

const Timeline = ({filterSchool, searchQuery, isSearched}) => {
    const payload = {
        category: filterSchool,
        keyword: searchQuery
    };
    const { data: posts, isPending: postsPending, error: postsError } = useFetch('/posts', payload);

    return (
        <div className="timeline">
            {!isSearched && <WritePost />}
            {isSearched && <SearchingProfiles searchQuery={searchQuery}/> }
            {isSearched && <SearchingClubs />}
            {postsPending && Array.from({ length: 2 }).map((_, index) => (
                <LoadingPosts key={index} />
            ))}
            {postsError && <div> {postsError} </div> }
            {posts && <Posts posts={posts} />}
        </div>
    );
}

export default Timeline;
