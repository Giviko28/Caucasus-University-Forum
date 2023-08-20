import WritePost from "./WritePost";
import Posts from './Posts';
import useFetch from '../hooks/useFetch';
import LoadingPosts from "./loading-components/LoadingPosts";

const Timeline = ({filterSchool}) => {
    const payload = {
        category: filterSchool
    };
    const { data: posts, isPending, error } = useFetch('/posts', payload);

    // const filteredPosts = posts && filter ? posts.filter(post => post.school === filter) : posts;

    return (
        <div className="timeline">
            <WritePost />
            {isPending && Array.from({ length: 2 }).map((_, index) => (
                <LoadingPosts key={index} />
            ))}
            {error && <div> {error} </div> }
            {posts && <Posts posts={posts} />}
        </div>
    );
}

export default Timeline;
