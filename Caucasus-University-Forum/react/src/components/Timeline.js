import WritePost from "./WritePost";
import Posts from './Posts';
import useFetch from '../hooks/useFetch';
import LoadingPosts from "./loading-components/LoadingPosts";
import SearchingProfiles from "./SearchingProfiles";
import SearchingClubs from "./SearchingClubs";
import Pagination from "./Pagination";
import axiosClient from "./axios-client";
import {useEffect, useState} from "react";
import FakePost from "./FakePost";

const Timeline = ({filterSchool, searchQuery, isSearched}) => {
    // const payload = {
    //     category: filterSchool,
    //     keyword: searchQuery
    // };


    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [posts, setPosts] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [published, setPublished] = useState(false);
    const [fakePost, setFakePost] = useState({});
    const [fakePosts, setFakePosts] = useState([]);
    // const {data: posts, isPending, error} = useFetch('/posts', payload);
    useEffect(() => {
        console.log(fakePosts);
        if (filterSchool || searchQuery || currentPage) {
            setPosts(null);
            setFakePosts([]);
            setIsPending(true);
        }
        axiosClient.get(`/posts?category=${filterSchool ?? ''}&keyword=${searchQuery ?? ''}&page=${currentPage}`)
            .then(response => {
                setPosts(response.data.data);
                setTotalPages(response.data.meta.last_page);
                setIsPending(false);
            })
            .catch(error => {
                setError(error.message);
                setIsPending(false);
            });
    }, [currentPage, filterSchool, searchQuery]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    return (
        <div className="timeline">
            {!isSearched && <WritePost fakePosts={fakePosts} setFakePosts={setFakePosts} setFakePost={setFakePost} fakePost={fakePost} setPublished={setPublished}/>}
            {!isSearched && published && posts &&
                <div className="new-post" style={published? {opacity: '75%'}: {}}>
                    <FakePost post={fakePost} />
                </div>
            }
            {fakePosts && <Posts posts={fakePosts} />}
            {isSearched &&
                <nav className="searching-navbar">
                    <button>All</button>
                    <button>Profiles</button>
                    <button>Clubs</button>
                    <button>Posts</button>
                </nav>
            }
            {isSearched &&
                <div className="searched-users-and-clubs">
                    <SearchingProfiles searchQuery={searchQuery}/>
                    <SearchingClubs />
                </div>
            }
            {isPending && Array.from({ length: 2 }).map((_, index) => (
                <LoadingPosts key={index} />
            ))}
            {error && <div> {error} </div> }
            {posts && <Posts posts={posts} />}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
}

export default Timeline;
