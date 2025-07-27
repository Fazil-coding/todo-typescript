import connectToDatabase from "./db";

async function insertData() {
  const client = await connectToDatabase();
  try {
    const insertInto = `INSERT INTO usersTable (name, email) VALUES ($1, $2) RETURNING id;`;
    const values = ["sahil", "hash_asswor"];
    const res = await client.query(insertInto, values);
    const insertTodo = `INSERT INTO todoTable (userId, title, description) VALUES ($1, $2, $3);`;
    const todoValues = [
      res.rows[0].id,
      "Sample Todo",
      "This is a sample todo description.",
    ];
    await client.query(insertTodo, todoValues);
    console.log("Data inserted successfully.");
  } catch (err) {
    console.error("Error inserting data:", err);
    throw err; // Re-throw the error to handle it in the calling function
  } finally {
    await client.end();
  }
}
insertData();
