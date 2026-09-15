import { prismaClient } from "db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const users = await prismaClient.user.findMany();

  return <div>{JSON.stringify(users)}</div>;
}
