import { createContext, useContext, useState } from "react";

export const TypePostsContext = createContext();

export function TypePostsProvider({children}) {
  const [typePosts, setTypePosts] = useState([]);

  return (
    <TypePostsContext.Provider value={{typePosts, setTypePosts}}>
      {children}
    </TypePostsContext.Provider>
  );
}

export function useTypePosts() {
  return useContext(TypePostsContext);
}