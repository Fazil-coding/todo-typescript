require("dotenv").config();
import { Client } from "pg";

async function connectToDatabase() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  try {
    await client.connect();
    console.log("Connected to the database successfully.");
    return client;
  } catch (err) {
    console.error("Failed to connect to the database:", err);
    throw err; // Re-throw the error to handle it in the calling function
  }
}
export default connectToDatabase;
