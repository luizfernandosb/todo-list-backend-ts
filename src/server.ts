import express from "express";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes";
import cors from 'cors';

dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["https://todo-list-ts-theta-ashen.vercel.app", "http://localhost:5173"], // Origens permitidas
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Métodos HTTP
    allowedHeaders: ["Content-Type", "Authorization", "token"], // Cabeçalhos permitidos
  })
);


app.use(express.json());
app.use("/api", todoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta  ${PORT}`);
});
