import { Post } from '../model/post.js';

import { Op, Sequelize } from 'sequelize';

export async function getAll() {
    return await Post.findAll();
}

export async function getById(id) {
    return await Post.findByPk(id);
}

export async function getTypesPosts() {
    return await Post.findAll({
        attributes: [
            [Sequelize.fn('DISTINCT', Sequelize.col('typePost')) ,'name'],
        ]
    });
}

export async function createPost({title, subtitle, date, url, typePost}) {
    return await Post.create({ title, subtitle, date, url, typePost});
}

export async function filter(dataInicial, dataFinal, typePost) {

    if(dataInicial && dataFinal && typePost){ 
        return await Post.findAll({ 
            where: {
                date: {
                    [Op.gte]: new Date(dataInicial),
                    [Op.lte]: new Date(dataFinal),
                },
                typePost: typePost
            }
        });
    }

    if(!dataInicial && !dataFinal && typePost) { 
        return await Post.findAll({ 
            where: {
                typePost: typePost
            }
        });
    }

    if(dataInicial && dataFinal && !typePost){ 
        return await Post.findAll({ 
            where: {
                date: {
                    [Op.gte]: new Date(dataInicial),
                    [Op.lte]: new Date(dataFinal),
                },
            }
        });
    }
}


