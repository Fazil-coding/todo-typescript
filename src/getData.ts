import connectToDatabase from "./db";

async function getUsers() {
  const client = await connectToDatabase();
  try {
    const selectUsersText = `SELECT * FROM usersTable;`;
    const res = await client.query(selectUsersText);
    console.log("Users retrieved successfully:", res.rows);
    return res.rows;
  } catch (err) {
    console.error("Error retrieving users:", err);
    throw err; // Re-throw the error to handle it in the calling function
  } finally {
    await client.end();
  }
}

async function getUserEmail(email: string) {
  const client = await connectToDatabase();
  try {
    const selectUserEmailText = `SELECT * FROM usersTable WHERE email = $1;`;
    const res = await client.query(selectUserEmailText, [email]);
    if (res.rows.length > 0) {
      console.log("User found:", res.rows[0]);
      return res.rows[0];
    } else {
      console.log("No user found with the provided email.");
      return null;
    }
  } catch (err) {
    console.error("Error retrieving user by email:", err);
    throw err; // Re-throw the error to handle it in the calling function
  } finally {
    await client.end();
  }
}

getUsers();
getUserEmail("mf3462354@gmail.com");
