import express from 'express'
import { readAllComunicacoes, createAwnser, closeComunicacao } from './controllers/monitoramentoController.js';
import { validateToken } from "../../middlewares/tokenValidation.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Rota da escola');
});

router.get('/all', validateToken, readAllComunicacoes)
router.post('/:id/:userId', validateToken, createAwnser)
router.patch('/close/:id', validateToken, closeComunicacao)

export default router;