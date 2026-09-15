import { prismaClient } from "db";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { completed } = await req.json();

  try {
    const todo = await prismaClient.todo.update({
      where: {
        id,
      },
      data: {
        completed,
      },
    });

    return Response.json(todo);
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    await prismaClient.todo.delete({
      where: {
        id,
      },
    });

    return new Response(null, { status: 204 });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    );
  }
}
