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

  try {
    await postFunctions.create(testUser._id, "Hoboken Public Library", new Date("2024-03-01"), 40.7448, -74.0256, "defaultImage.png", 42000, "Help us raise money to build a new public library.");
    await postFunctions.create(testUser._id, "Chicago Homeless Shelter", new Date("2024-02-01"), 41.88807786689427, -87.66949301884168, "defaultImage.png", 20000, "Help us raise money for a new homeless shelter.");
    await postFunctions.create(testUser._id, "Los Angeles Drug Rehabilitation Center", new Date("2023-08-27"), 33.871657982968884, -118.20394580219903, "defaultImage.png", 50000, "Help us raise money for a new rehabilitation center.");
    await postFunctions.create(testUser._id, "School Supplies", new Date("2023-10-12"), 14.409986271604106, -87.04194422867482, "defaultImage.png", 1000, "Help us get school supplies to improve the education of our children.");
    await postFunctions.create(testUser._id, "New York City Food Bank", new Date("2024-01-15"), 40.7128, -74.0060, "defaultImage.png", 30000, "Help us raise money to provide meals for those in need.");
    await postFunctions.create(testUser._id, "Seattle Children's Hospital", new Date("2023-11-20"), 47.6062, -122.3321, "defaultImage.png", 75000, "Help us raise funds for medical equipment and patient care.");
    await postFunctions.create(testUser._id, "Miami Hurricane Relief", new Date("2024-04-10"), 25.7617, -80.1918, "defaultImage.png", 100000, "Help us provide aid to those affected by recent hurricanes.");
    await postFunctions.create(testUser._id, "Denver Animal Shelter", new Date("2023-09-05"), 39.7392, -104.9903, "defaultImage.png", 15000, "Help us raise money to provide care for rescued animals.");
    await postFunctions.create(testUser._id, "Atlanta Community Garden", new Date("2024-03-18"), 33.7490, -84.3880, "defaultImage.png", 5000, "Help us create a community garden to promote healthy living.");
    await postFunctions.create(testUser._id, "San Francisco Art Program", new Date("2023-12-03"), 37.7749, -122.4194, "defaultImage.png", 8000, "Help us fund art programs for underprivileged youth.");
    await postFunctions.create(testUser._id, "Boston Literacy Campaign", new Date("2024-02-14"), 42.3601, -71.0589, "defaultImage.png", 25000, "Help us raise money to promote literacy in our community.");
    await postFunctions.create(testUser._id, "Austin Music Education", new Date("2023-11-08"), 30.2672, -97.7431, "defaultImage.png", 12000, "Help us provide musical instruments and lessons for students.");
    await postFunctions.create(testUser._id, "New Orleans Disaster Relief", new Date("2024-01-30"), 29.9511, -90.0715, "defaultImage.png", 50000, "Help us provide aid to those affected by natural disasters.");
    await postFunctions.create(testUser._id, "Tokyo Earthquake Relief", new Date("2024-03-12"), 35.6895, 139.6917, "defaultImage.png", 80000, "Help us provide aid to those affected by recent earthquakes in Japan.");
    await postFunctions.create(testUser._id, "London Homeless Outreach", new Date("2023-11-28"), 51.5074, -0.1278, "defaultImage.png", 22000, "Help us raise money to support the homeless in London.");
    await postFunctions.create(testUser._id, "Paris Environmental Initiative", new Date("2024-01-07"), 48.8566, 2.3522, "defaultImage.png", 35000, "Help us fund projects to make Paris a greener city.");
    await postFunctions.create(testUser._id, "Berlin Youth Sports Program", new Date("2023-09-18"), 52.5200, 13.4050, "defaultImage.png", 10000, "Help us provide sports equipment and training for youth in Berlin.");
    await postFunctions.create(testUser._id, "Sydney Wildlife Conservation", new Date("2024-02-25"), -33.8688, 151.2093, "defaultImage.png", 28000, "Help us protect and conserve Australian wildlife.");
    await postFunctions.create(testUser._id, "Rio de Janeiro Community Center", new Date("2023-12-10"), -22.9068, -43.1729, "defaultImage.png", 15000, "Help us build a community center in a low-income area of Rio.");
    await postFunctions.create(testUser._id, "Moscow Children's Shelter", new Date("2024-04-02"), 55.7558, 37.6173, "defaultImage.png", 40000, "Help us provide a safe haven for children in need in Moscow.");
    await postFunctions.create(testUser._id, "Cairo Education Fund", new Date("2023-10-30"), 30.0444, 31.2357, "defaultImage.png", 20000, "Help us improve education for underprivileged children in Cairo.");
    await postFunctions.create(testUser._id, "Toronto Mental Health Support", new Date("2024-03-22"), 43.6532, -79.3832, "defaultImage.png", 32000, "Help us provide mental health resources and support in Toronto.");
    await postFunctions.create(testUser._id, "Mexico City Disaster Relief", new Date("2023-11-15"), 19.4326, -99.1332, "defaultImage.png", 45000, "Help us provide aid to those affected by natural disasters in Mexico City.");
    await postFunctions.create(testUser._id, "Amsterdam Arts and Culture", new Date("2024-01-20"), 52.3667, 4.8945, "defaultImage.png", 18000, "Help us support local artists and cultural events in Amsterdam.");
    await postFunctions.create(testUser._id, "Buenos Aires Elderly Care", new Date("2023-09-02"), -34.6037, -58.3816, "defaultImage.png", 12000, "Help us improve care for the elderly in Buenos Aires.");
    await postFunctions.create(testUser._id, "Dubai Refugee Aid", new Date("2024-02-08"), 25.2048, 55.2708, "defaultImage.png", 55000, "Help us provide support for refugees in Dubai.");
    await postFunctions.create(testUser._id, "Mumbai Women's Empowerment", new Date("2023-12-22"), 19.0760, 72.8777, "defaultImage.png", 25000, "Help us empower women through education and job training in Mumbai.");
    await postFunctions.create(testUser._id, "Cape Town Clean Water Initiative", new Date("2024-03-05"), -33.9249, 18.4241, "defaultImage.png", 30000, "Help us provide clean water access to communities in Cape Town.");
    await postFunctions.create(testUser._id, "Kyiv Medical Aid", new Date("2023-10-18"), 50.4501, 30.5234, "defaultImage.png", 60000, "Help us provide medical supplies and care for those affected by the ongoing conflict in Ukraine.");
    await postFunctions.create(testUser._id, "Lviv Humanitarian Relief", new Date("2024-02-28"), 49.8397, 24.0297, "defaultImage.png", 40000, "Help us provide food, shelter, and support for displaced families in Lviv, Ukraine.");
  } catch (e) {
    console.error(e);
  }

  // Closing the connection
  console.log("Done seeding database");
  await closeConnection();
};

main().catch(console.log);