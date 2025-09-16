import express from "express";
import cors from "cors";
import { ensayosRouter } from "./routes/ensayos";
import dotenv from "dotenv";

// Carga variables de entorno desde el archivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares basicos
app.use(cors());
app.use(express.json()); // Parseo de JSON en el body

// Rutas
app.use("/ensayos", ensayosRouter); // Le agrega el prefijo /ensayos a las rutas del ensayosRouter

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
