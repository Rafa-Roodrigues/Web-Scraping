import { useEffect, useState } from 'react';
import toast from "react-hot-toast";

import { Filter } from './components/Filter';
import { Post } from './components/Post';
import { Loading } from '../../components/Loading';

import { usePosts } from '../../context/PostContext';
import { useTypePosts } from '../../context/TypePostsContext';
import { api } from '../../services/axios';

import './style.scss';

export function Home() {
    const { posts, setPosts} = usePosts();
    const { setTypePosts} = useTypePosts();
    const [isLoading, setIsLoading] = useState(false);

    async function handleExecuteScript() {
        try {
            setIsLoading(true);
            await api.get('/valoreconomico');
            setIsLoading(false);

            getPosts();
            getTypePosts();
            
        } catch (error) {
            setIsLoading(false);
            toast.error(error.response.data.message);
        }
    }

    async function getTypePosts() {
        try {
            const response = await api.get('/posts/typeposts');
            const typePostsFormated = response.data.map(post => ({
                value: post.name.toLowerCase(),
                label: post.name
            }));

            setTypePosts([{
                label: 'Selecione um topico',
                value: ''
            }, ...typePostsFormated]);
        } catch(error) {
            toast.error(error.response.data.message);
        }
    }

    async function getPosts() {
        try {
            const response = await api.get('/posts');
           
            setPosts(response.data);
        } catch(error) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            <div className='box_button max_box'>
                <button onClick={handleExecuteScript}>Executar Script</button>
            </div>
            <Filter/>

            <main className='max_box'>
                {posts.length > 0 && (
                    posts.map( (post) => (
                        <Post key={post.id} data={post}/>
                    ))
                )}

                {posts.length == 0 && (
                    <h1 className='not_data'>Sem dados</h1>
                )}
            </main> 
            <Loading isLoading={isLoading}/>
        </>
    );
}