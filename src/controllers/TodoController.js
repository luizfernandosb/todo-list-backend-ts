"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.toggleComplete = exports.addTodo = exports.getTodos = void 0;
const prisma_1 = __importDefault(require("../services/prisma"));
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield prisma_1.default.todo.findMany();
        res.json(todos);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao buscar dados." });
    }
});
exports.getTodos = getTodos;
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text } = req.body;
    try {
        if (!text) {
            throw new Error("Campo vazio, insira um nome para sua tarefa.");
        }
        const newTodo = yield prisma_1.default.todo.create({
            data: {
                text,
                completed: false,
            },
        });
        res.status(201).json(newTodo);
    }
    catch (error) {
        // console.log(error)
        res.status(500).json({ error: "Erro ao adicionar nova tarefa." });
    }
});
exports.addTodo = addTodo;
const toggleComplete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const todo = yield prisma_1.default.todo.findUnique({ where: { id: Number(id) } });
        if (!todo)
            throw new Error("Erro ao encontrar tarefa.");
        const updateTodo = yield prisma_1.default.todo.update({
            where: { id: Number(id) },
            data: { completed: !todo.completed }
        });
        res.json(updateTodo);
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.toggleComplete = toggleComplete;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma_1.default.todo.delete({ where: { id: Number(id) } });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ erro: "Erro ao deletar tarefa." });
    }
});
exports.deleteTodo = deleteTodo;
