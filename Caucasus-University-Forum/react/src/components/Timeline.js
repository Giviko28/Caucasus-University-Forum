import WritePost from "./WritePost";
import Posts from './Posts';
import useFetch from '../hooks/useFetch';
import LoadingPosts from "./loading-components/LoadingPosts";

const Timeline = ({filter}) => {
    const { data: posts, isPending, error } = useFetch('/posts');

    // const filteredPosts = posts && filter ? posts.filter(post => post.school === filter) : posts;

    return (
        <div className="timeline">
            <WritePost />
            {isPending && <LoadingPosts />}
            {error && <div> {error} </div> }
            {posts && <Posts posts={posts} />}
        </div>
    );
}

export default Timeline;
