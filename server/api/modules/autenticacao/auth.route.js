import express from 'express'
const router = express.Router();

import { login } from './controllers/authController.js';
import { validateToken } from '../../middlewares/tokenValidation.js';

router.get('/', (req, res) => {
    res.send('Rota de autenticação');
});
router.get('/validate', validateToken, (req,res) => {
    res.send('Token válido');
})
router.post('/login', login)
router.post('/logout', (req, res) => {
    res.clearCookie('access_token').send('Logout realizado com sucesso');
})

export default router;