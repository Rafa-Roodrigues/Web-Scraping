import 'dotenv/config';
import './database/index.js';
import './model/post.js';
import express from 'express';
import { routes } from './controller/index.js';

import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = 8080;

app.listen(PORT, () => {
    console.log("Backend rodando na porta " + PORT);
});





































// import { create } from './repository/PostRepository.js';

// (async () => {
//     try {
//         // await database.sync();
//         await create({title: 'Titulo', subtitle: 'Subtitulo', date: new Date(), url: "url", topic: "finanças"})
//     } catch (error) {
//         console.log(error);
//     }
// })();