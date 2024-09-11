import { closeConnection, dbConnection } from "./config/mongoConnections.js";
import * as userFunctions from "./data/users.js";
import * as postFunctions from "./data/posts.js";


// Main function for the seed script
const main = async () => {
  // Connect to the database and drop it
  const db = await dbConnection();
  await db.dropDatabase();

  // Create a User
  let testUser;
  try {
    testUser = await userFunctions.create("testUser", "Test", "User", "testUser@stevens.edu", "testUser");
  } catch (e) {
    console.error(e);
  }

  // Create a Post
  let testPost;
  try {
    testPost = await postFunctions.create(testUser._id, "Test Post", new Date(), 40.7448, -74.0256, "defaultImage.png", 42000, "This is a test post");
  } catch (e) {
    console.error(e);
  }

  // Closing the connection
  console.log("Done seeding database");
  await closeConnection();
};

main().catch(console.log);