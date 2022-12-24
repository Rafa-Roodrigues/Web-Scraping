import { Toaster } from 'react-hot-toast';

import { Home } from "./pages/Home";
import { Header } from "./components/Header";

import { PostProvider } from './context/PostContext';
import { TypePostsProvider } from './context/TypePostsContext';

function App() {
  return (
    <TypePostsProvider>
      <PostProvider>
        <Toaster position="top-right"/>
        <Header/>
        <Home/>
      </PostProvider>
    </TypePostsProvider>
  );
}

export default App;
