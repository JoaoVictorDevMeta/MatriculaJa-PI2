import monitoramentoServices from "../services/monitoramentoService.js";
import { sendMail } from "../../../utils/sendEmail.js";
import Joi from "joi";

const awnserSchema = Joi.object({
  subtitulo: Joi.string().required(),
  resposta: Joi.string().required(),
  contactName: Joi.string().required(),
  contactEmail: Joi.string().required(),
});

export async function readAllComunicacoes(req, res) {
  try {
    if(req.user.perfil === "Escola"){
      const comunicacoes = await monitoramentoServices.getComunicacoes("Matrícula");
      return res.json(comunicacoes);
    }
    const comunicacoes = await monitoramentoServices.getComunicacoes(null);
    res.json(comunicacoes);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching comunicacoes" });
  }
}

export async function closeComunicacao(req, res) {
    try {
        const { id } = req.params;
        console.log(id)
        const communicationExists = await monitoramentoServices.getComunicacaoId(id);
        if (!communicationExists) {
        return res.status(400).json({error: `Communication with id ${id} does not exist.`});
        }
    
        await monitoramentoServices.closeComunicacao(id);
    
        res.json({ message: "Communication closed successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while closing communication" });
    }
}

export async function createAwnser(req, res) {
  const { error } = awnserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const { id, userId } = req.params;
    const { subtitulo, resposta, contactName, contactEmail } = req.body;
    //console.log(resposta)

    const communicationExists = await monitoramentoServices.getComunicacaoId(id);
    if (!communicationExists) {
      return res.status(400).json({error: `Essa comunicação não existe`});
    }

    // Check if the user exists
    const userExists = await monitoramentoServices.getUserId(userId);
    if (!userExists) {
      return res.status(400).json({error: `Esse usuário nao existe`});
    }

    await sendMail(contactEmail, contactName, subtitulo, resposta);

    const awnser = await monitoramentoServices.createAwnserComunicacao(
      resposta,
      id,
      userId
    );

    res.json(awnser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Algo deu errado na hora de enviar resposta" });
  }
}
