import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

//testing route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// aplicação de rotas da api no servidor
// qualquer manipulação de rota deve ser feita no arquivo router.js
// não alterar quaisquer rotas neste arquivo!!!
import rotas from './router.js';
app.use('/api', rotas);

// função para tratar erros na aplicação
app.use( ( error, req, res, next ) => {
	const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});