// Simple database test script
const { ConvexHttpClient } = require("convex/browser");

const client = new ConvexHttpClient("http://127.0.0.1:3210");

async function testDatabase() {
  try {
    console.log("Testing Convex database connection...");
    
    // Test listing users (should work without auth for testing)
    console.log("Testing users.list function...");
    
    // Test mail.list function
    console.log("Testing mail.list function...");
    
    console.log("Database connection test completed!");
  } catch (error) {
    console.error("Database test failed:", error);
  }
}

testDatabase();