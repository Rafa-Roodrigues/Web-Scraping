import axios from 'axios';
import { load } from 'cheerio';

import { createPostService } from './createPostService.js';

export async function getPostService({dateUrl, dateAmerican}) {
    try {
        const url = `https://valor.globo.com/impresso/${dateUrl}/`;
        
        const response = await axios(url);
        const html = response.data;
        const $ = load(html);

        const topicsOfPage = [];
        const posts = [];

        $('section.section-block', html).each(function() {
            topicsOfPage.push($(this).attr('id'));
        });

        topicsOfPage.forEach(idOfTopic => {
            $(`section[id=${idOfTopic}]`, html)
            .each(function() {
                const topic = $('div.section-block__title', this).text().trim();
                
                $('div.newsfeed-item > div.newsfeed-post > div.newsfeed-post__body', this)
                .each(function() {
            
                    const post = {
                        title: $('div.newsfeed-post__title > a', this).text().trim(),
                        subtitle: $('div.newsfeed-post__subtitle', this).text().trim(),
                        date: new Date(dateAmerican),
                        url: $('div.newsfeed-post__title > a', this).attr("href").trim(),
                        typePost: topic
                    }  
                    
                    posts.push(post);
                })
            })
        })
        
        await Promise.all(
            posts.map(async (post) =>
                createPostService(post)
            )
        );
    } catch(error) {
        if(error.response.status == 404) {
            return null;
        }
        
        throw new Error("Não foi possível buscar os posts no site");
    }
}