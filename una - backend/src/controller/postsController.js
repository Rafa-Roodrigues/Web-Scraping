import { Router } from 'express';

import { getAll, filter, getTypesPosts, getById } from '../repository/postRepository.js';

export const postsController = Router();

postsController.get('/', async (request, response) => {
    try {
        const posts = await getAll();

        return response.status(200).json(posts);

    } catch (error) {
        return response.status(500).json({message: error.message});
    }
});

postsController.get('/filter', async (request, response) => {
    try {
        let { dataInicial, dataFinal, typePost } = request.query;
    
        if(dataInicial && !dataFinal) {
            dataFinal = dataInicial;
        }

        const posts = await filter(dataInicial, dataFinal, typePost);

        return response.status(200).json(posts);
    } catch (error) {
        return response.status(500).json({message: error.message});
    }
});

postsController.get('/typeposts', async (request, response) => {
    try {
        const posts = await getTypesPosts();

        return response.status(200).json(posts);
    } catch (error) {
        return response.status(500).json({message: error.message});
    }
});

postsController.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const post = await getById(id);

        return response.status(200).json(post);

    } catch (error) {
        return response.status(500).json({message: error.message});
    }    
});
