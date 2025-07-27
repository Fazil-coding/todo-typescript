import connectToDatabase from "./db";

async function updateTodo(
  todoId: number,
  title: string,
  description: string,
  completed: boolean
) {
  const client = await connectToDatabase();
  try {
    const updateTodoQuery = `
      UPDATE todoTable
      SET title = $1, description = $2, completed = $3
      WHERE id = $4;
    `;
    const values = [title, description, completed, todoId];
    const res = await client.query(updateTodoQuery, values);

    if ((res.rowCount ?? 0) > 0) {
      console.log("Todo updated successfully.", res.rows[0]);
      return res.rows[0];
    } else {
      console.log("No todo found with the provided ID.");
    }
  } catch (err) {
    console.error("Error updating todo:", err);
    throw err; // Re-throw the error to handle it in the calling function
  } finally {
    await client.end();
  }
}
updateTodo(3, "GYM", "10 pull ups.", true);
