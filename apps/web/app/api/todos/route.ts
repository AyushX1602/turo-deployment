import { prismaClient } from "db";

export async function GET() {
  try {
    const todos = await prismaClient.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(todos);
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const { title } = await req.json();

  if (!title) {
    return Response.json({ error: "Title is required" }, { status: 400 });
  }

  try {
    const todo = await prismaClient.todo.create({
      data: {
        title,
      },
    });

    return Response.json(todo, { status: 201 });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    );
  }
}
