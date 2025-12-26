require("dotenv").config();


const app = require("./app");
const connectDB = require("./config/db");

// Connect MongoDB
connectDB();

require("./cron/deleteOldPdfs");


const PORT = process.env.PORT || 5000;

// START SERVER (THIS WAS MISSING)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
