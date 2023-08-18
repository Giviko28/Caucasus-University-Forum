import WritePost from "./WritePost";
import Posts from './Posts';
import useFetch from '../hooks/useFetch';

const Timeline = ({filter}) => {
    const { data: posts, isPending, error } = useFetch('http://localhost:8000/posts');

    const filteredPosts = posts && filter ? posts.filter(post => post.school === filter) : posts; 

    return ( 
        <div className="timeline">
            <WritePost />
            {isPending && <p>loading...</p>}
            {error && <div> {error} </div> }
            {posts && <Posts posts={filteredPosts} />}
        </div>
    );
}

export default Timeline;