import connectToDatabase from "./db";

async function deleteTodo(todoId: number) {
  const client = await connectToDatabase();
  try {
    const deleteTodoQuery = `
            DELETE FROM todoTable
            WHERE id = $1;
        `;
    const res = await client.query(deleteTodoQuery, [todoId]);

    if (res.rowCount ?? 0 > 0) {
      console.log("Todo deleted successfully.");
    } else {
      console.log("No todo found with the provided ID.");
    }
  } catch (err) {
    console.error("Error deleting todo:", err);
    throw err; // Re-throw the error to handle it in the calling function
  } finally {
    await client.end();
  }
}

deleteTodo(3);
