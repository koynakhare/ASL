import app from "./app.js";
import { connectDB } from "./config/db.js";
import { config } from "./config/index.js";

// Connect to MongoDB first
await connectDB();

// Start the Express server
app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port} in ${config.env} mode`);
});
