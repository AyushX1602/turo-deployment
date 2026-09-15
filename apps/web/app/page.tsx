import { prismaClient } from "db";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

async function addTodo(formData: FormData) {
  "use server";

  const title = formData.get("title")?.toString().trim();

  if (!title) {
    return;
  }

  await prismaClient.todo.create({
    data: {
      title,
    },
  });

  revalidatePath("/");
}

async function toggleTodo(formData: FormData) {
  "use server";

  const id = formData.get("id")?.toString();
  const completed = formData.get("completed") === "true";

  if (!id) {
    return;
  }

  await prismaClient.todo.update({
    where: {
      id,
    },
    data: {
      completed: !completed,
    },
  });

  revalidatePath("/");
}

async function deleteTodo(formData: FormData) {
  "use server";

  const id = formData.get("id")?.toString();

  if (!id) {
    return;
  }

  await prismaClient.todo.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
}

export default async function Home() {
  const todos = await prismaClient.todo.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="todo-page">
      <section className="todo-shell">
        <h1>Todos</h1>
        <form action={addTodo} className="todo-form">
          <input name="title" placeholder="Add a todo" />
          <button type="submit">Add</button>
        </form>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <form action={toggleTodo}>
                <input name="id" type="hidden" value={todo.id} />
                <input
                  name="completed"
                  type="hidden"
                  value={String(todo.completed)}
                />
                <button type="submit" className="todo-check">
                  {todo.completed ? "Done" : "Todo"}
                </button>
              </form>
              <span className={todo.completed ? "completed" : ""}>
                {todo.title}
              </span>
              <form action={deleteTodo}>
                <input name="id" type="hidden" value={todo.id} />
                <button type="submit" className="delete-button">
                  Delete
                </button>
              </form>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
