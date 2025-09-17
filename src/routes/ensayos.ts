import express from "express";
import {
  ensayoPostRequestBodySchema,
  ensayoPutRequestBodySchema,
} from "../validation/schemas";
import { z } from "zod";
import {
  createEnsayo,
  getEnsayos,
  getEnsayoByCodigo,
  deleteEnsayo,
  updateEnsayo,
} from "../data/ensayos";

export const ensayosRouter = express.Router();

// POST /ensayos
ensayosRouter.post("/", async (req, res) => {
  try {
    const ensayo = ensayoPostRequestBodySchema.parse(req.body);

    const nuevoEnsayo = await createEnsayo(ensayo);

    res.status(201).json({ success: true, data: nuevoEnsayo });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ success: false, message: "Error de validación" });
    }
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
});

// GET /ensayos
ensayosRouter.get("/", async (_, res) => {
  try {
    const ensayos = await getEnsayos();

    res.status(200).json({ success: true, data: ensayos });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
});

// GET /ensayos/:codigo
ensayosRouter.get("/:codigo", async (req, res) => {
  try {
    const codigo = parseInt(req.params.codigo, 10);

    const ensayo = await getEnsayoByCodigo(codigo);

    if (!ensayo) {
      return res
        .status(404)
        .json({ success: false, message: "Ensayo no encontrado" });
    }

    res.status(200).json({ success: true, data: ensayo });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
});

// DELETE /ensayos/:codigo
ensayosRouter.delete("/:codigo", async (req, res) => {
  try {
    const codigo = parseInt(req.params.codigo, 10);

    const ensayoEliminado = await deleteEnsayo(codigo);

    if (!ensayoEliminado) {
      return res
        .status(404)
        .json({ success: false, message: "Ensayo no encontrado" });
    }

    res.status(200).json({ success: true, data: ensayoEliminado });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
});

// PUT /ensayos/:codigo
ensayosRouter.put("/:codigo", async (req, res) => {
  try {
    const codigo = parseInt(req.params.codigo, 10);

    const actualizacionesEnsayo = ensayoPutRequestBodySchema.parse(req.body);

    const ensayoActualizado = await updateEnsayo(codigo, actualizacionesEnsayo);

    if (!ensayoActualizado) {
      return res
        .status(404)
        .json({ success: false, message: "Ensayo no encontrado" });
    }

    res.status(200).json({ success: true, data: ensayoActualizado });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ success: true, message: "Error de validación" });
    }
    res
      .status(500)
      .json({ success: true, message: "Error interno del servidor" });
  }
});
