import express from "express";
import { prismaClient } from "db";

const app = express();

app.use(express.json());

app.get("/todos", async (_req, res) => {
  try {
    const todos = await prismaClient.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : "Unknown error" });
  }
});

app.post("/todo", async (req, res) => {
  const { title } = req.body;

  if (!title) {
    res.status(400).json({ error: "Title is required" });
    return;
  }

  try {
    const todo = await prismaClient.todo.create({
      data: {
        title,
      },
    });

    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : "Unknown error" });
  }
});

app.patch("/todo/:id", async (req, res) => {
  try {
    const todo = await prismaClient.todo.update({
      where: {
        id: req.params.id,
      },
      data: {
        completed: req.body.completed,
      },
    });

    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : "Unknown error" });
  }
});

app.delete("/todo/:id", async (req, res) => {
  try {
    await prismaClient.todo.delete({
      where: {
        id: req.params.id,
      },
    });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : "Unknown error" });
  }
});

app.listen(8080);
