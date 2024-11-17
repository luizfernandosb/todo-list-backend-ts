"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const cors = require("cors");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(cors({
    origin: "*", // Permitir todas as origens (você pode restringir a origem se necessário)
    methods: "GET, POST, PUT, PATCH, DELETE", // Métodos permitidos
    allowedHeaders: "Content-Type, Authorization, token", // Cabeçalhos permitidos
}));
app.use(express_1.default.json());
app.use("/api/", todoRoutes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta  ${PORT}`);
});
