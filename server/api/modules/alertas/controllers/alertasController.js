import Joi from 'joi';
//rotas
import alertasService from "../services/alertasService.js";

//alert schema
const alertSchema = Joi.object({
  id_categoria_alerta_fk: Joi.string().required(),
  titulo: Joi.string().required(),
  descricao: Joi.string().required(),
});

export async function getAllAlerts(req, res) {
  try {
    const {userId, userType} = req.params; //this can be changed when whe have authentication
    if(userId !== req.user.id) return res.status(401).json({ error: "Unauthorized" });
    let alerts = [];

    if(userType === 'Admin' || userType === 'Gestor') {
      alerts = await alertasService.getAllAlerts();
    } else if (userType === 'Escola') {
      const school = alertasService.getSchoolName(userId);
      alerts = await alertasService.getAllStudentAlerts(school.nome_escola);
    } else {
      alerts = await alertasService.getAllUserAlerts(userId);
    }

    res.json(alerts);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "An error occurred while fetching alerts" });
  }
}

export async function getSingleAlert(req, res) {
  try {
    const alert = await alertasService.getSingleAlert(req.params.id);
    res.json(alert);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while fetching alert" });
  }
}

export async function createAlert(req, res) {
  const { error } = alertSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const alert = await alertasService.createAlert(req.body);
    res.json(alert);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while creating alert" });
  }
}

export async function updateAlert(req, res) {
  const { error } = alertSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const alert = await alertasService.updateAlert(req.params.id, req.body);
    res.json(alert);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while updating alert" });
  }
}

export function deleteAlert(req, res) {
  try {
    const alert = alertasService.deleteAlert(req.params.id);
    res.json(alert);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while deleting alert" });
  }
}