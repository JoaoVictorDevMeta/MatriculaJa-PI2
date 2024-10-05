import express from 'express'
import { validateToken } from './middlewares/tokenValidation.js';

const router = express.Router();

// Fazendo a importação de todas as rotas
//const escolaRoutes = require('./modules/monitoramento/routes/escolaRoutes');
import monitoramentoRoutes from './modules/monitoramento/monitoramento.route.js';
//const alertasRoutes = require('./modules/alertas/routes/alertasRoutes');
import alertaRoutes from './modules/alertas/alerts.route.js'
//const loginRoutes = require('./modules/login/routes/loginRoutes');
import authRoutes from './modules/autenticacao/auth.route.js';

// Rotas para cada módulo
// módulo monitoramento
router.use('/monitoramento', validateToken, monitoramentoRoutes);
// módulo alertas
router.use('/alertas', alertaRoutes);
// módulo autenticação
router.use('/auth', authRoutes);

//rota teste
router.get('/', (req, res) => {
    res.send('Rota principal');
});

export default router;