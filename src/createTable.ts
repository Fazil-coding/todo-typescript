import connectToDatabase from "./db";

async function createTable() {
  const client = await connectToDatabase();
  try {
    const createUserTable = `
      CREATE TABLE IF NOT EXISTS usersTable (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL
      );
    `;
    await client.query(createUserTable);
    const createTodoTable = `
      CREATE TABLE IF NOT EXISTS todoTable (
        id SERIAL PRIMARY KEY,
        userId INTEGER REFERENCES usersTable(id),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT FALSE
      );`;
    await client.query(createTodoTable);
    console.log("Table  created successfully.");
  } catch (error) {
    console.error("Error creating table:", error);
  }
}
createTable();
