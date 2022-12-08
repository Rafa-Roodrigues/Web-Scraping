import { createContext, useContext, useState } from "react";

export const PostContext = createContext();

export function PostProvider({children}) {
  const [posts, setPosts] = useState([]);

  return (
    <PostContext.Provider value={{setPosts, posts}}>
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  return useContext(PostContext);
}