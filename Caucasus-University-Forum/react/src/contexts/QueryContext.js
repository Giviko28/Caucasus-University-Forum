// import {createContext, useState} from "react";
// import queryString from "query-string";
// import axiosClient from "../components/axios-client";
//
// const QueryContext = createContext({
//     posts: null
// })
//
// export const QueryContextProvider = ({children}) => {
//     const [query, _setQuery] = useState(null);
//     const [posts, setPosts] = useState(null);
//
//     const setQuery = () => {
//
//     }
//
//     axiosClient.get(`/posts?${query}`)
//         .then(response => {
//             setPosts(response.data);
//         })
//         .catch(error => {
//             throw error;
//         })
//     return (
//         <QueryContext.Provider value={{
//             posts
//         }}>
//             {children}
//         </QueryContext.Provider>
//     )
// }
