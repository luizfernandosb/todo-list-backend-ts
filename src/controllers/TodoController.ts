import { Request, Response } from "express";
import prisma from "../services/prisma";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await prisma.todo.findMany();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar dados." });
  }
};

export const addTodo = async (req: Request, res: Response) => {
  const { text } = req.body;
  try {
    if (!text) {
      res.status(406).json({
        erro: "Texto de tarefa vazio ou não enviado!"
      })
    }
    const newTodo = await prisma.todo.create({
      data: {
        text,
        completed: false,
      },
    });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar nova tarefa." });
  }
};

export const toggleComplete = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const todo = await prisma.todo.findUnique({ where: { id: Number(id) } });
    if (!todo) {
      res.status(404).json({
        msg: "Erro ao encontrar tarefa."
      })
      return
    }
    const updateTodo = await prisma.todo.update({
      where: { id: Number(id) },
      data: { completed: !todo.completed }
    });
    res.json(updateTodo);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.todo.delete({ where: { id: Number(id) } });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar tarefa." });
  }
};
