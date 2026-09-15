import { prismaClient } from "db";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return Response.json(
      { error: "Username and password are required" },
      { status: 400 },
    );
  }

  try {
    const user = await prismaClient.user.create({
      data: {
        username,
        password,
      },
    });

    return Response.json(user, { status: 201 });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    );
  }
}
