import express from "express";
const router = express.Router();

//controllers
import {
  getAllAlerts,
  getSingleAlert,
  createAlert,
  updateAlert,
  deleteAlert,
} from "./controllers/alertasController.js";
import { validateToken } from "../../middlewares/tokenValidation.js";

router.get("/", (req, res) => {
  res.send("Rota de alertas");
});
router.get("/all/:userId/:userType", validateToken, getAllAlerts);
router.get("/:id", getSingleAlert);
router.post("/", createAlert);
router.put("/:id", updateAlert);
router.delete("/:id", deleteAlert);

export default router;
