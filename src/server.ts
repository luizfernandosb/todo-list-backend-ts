import express from "express";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes";
import exp from "constants";
const cors = require("cors");


dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*", // Permitir todas as origens (você pode restringir a origem se necessário)
    methods: "GET, POST, PUT, PATCH, DELETE", // Métodos permitidos
    allowedHeaders: "Content-Type, Authorization, token", // Cabeçalhos permitidos
  })
);

app.use(express.json());
app.use("/api/", todoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta  ${PORT}`)
})
