import jwt from "jsonwebtoken";
import authServices from "../services/authService.js";

export async function login(req, res){
    try{
        const user = req.body;

        const dbUser = await authServices.loginUser(req.body?.email);
        if(!dbUser){
            return res.status(400).json({fail: "nenhum usuário encontrado"});
        }

        console.log(user, dbUser)

        if(user?.password === dbUser.senha){
            const token = jwt.sign({id: dbUser.id, perfil: dbUser.perfil.nome_perfil}, process.env.JWT_SECRET);
            const expiryDate = new Date(Date.now() + 3600000);
            const { senha, ...validUser } = dbUser; 

            return res
            .cookie('access_token', token, {
                httpOnly: true,
                expires: expiryDate,
            }) //send token
            .status(200) // send success status
            .json(validUser)
        }
        return res.status(401).json({fail: "credenciais incorretas"});
    }catch(error){
        console.log(error)
        res.status(500).json({ error: "An error occurred while doing login" });
    }
}