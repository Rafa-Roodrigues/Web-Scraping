import { createPost } from '../repository/postRepository.js';

export async function createPostService({ title, subtitle, date, url, typePost}) {
    await createPost({title, subtitle, date, url, typePost});
}