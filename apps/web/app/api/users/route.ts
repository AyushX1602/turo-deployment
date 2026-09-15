import { prismaClient } from "db";

export async function GET() {
  try {
    const users = await prismaClient.user.findMany();
    return Response.json(users);
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    );
  }
}
