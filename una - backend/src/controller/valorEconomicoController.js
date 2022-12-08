import { Router } from 'express';

import { getPostService } from '../service/getPostService.js';
import { getDatesWeekday } from '../utils/getDatesWeekday.js';

export const valorEconomicoController = Router();

valorEconomicoController.get('/', async (request, response) => {
    try {
        const datesWeekday = getDatesWeekday();

        await Promise.all(
            datesWeekday.map(async (date) =>
                getPostService(date)
            )
        );
        
        return response.status(200).json({message: "Todos os dados foram buscados e inseridos no banco de dados."})
    } catch(error) {
        return response.json({message: error.message});
    }
});
